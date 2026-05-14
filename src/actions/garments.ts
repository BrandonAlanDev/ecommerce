"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createGarment(data: {
  name: string;
  description?: string;
  price: number;
  cost: number;
  categoryId: string;
  subCategoryId?: string;
  supplierId?: string;
  images: { srcImage: string; alt?: string; order: number }[];
}) {
  try {
    const garment = await prisma.garment.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        cost: data.cost,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        supplierId: data.supplierId,
        images: {
          create: data.images,
        },
      },
    });

    revalidatePath("/admin/garments");
    return { success: true, data: garment };
  } catch (error) {
    console.error("Error creating garment:", error);
    return { success: false, error: "No se pudo crear el producto." };
  }
}

/**
 * ACTUALIZAR PRODUCTO
 */
export async function updateGarment(id: string, data: any) {
  try {
    await prisma.garment.update({
      where: { id },
      data: data,
    });

    revalidatePath("/admin/garments");
    revalidatePath(`/(public)/productos/${id}`); // Actualiza la vista del cliente
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al actualizar." };
  }
}

/**
 * ELIMINAR PRODUCTO
 * Nota: GarmentImage tiene onDelete: Cascade, por lo que se borran solas.
 */
export async function deleteGarment(id: string) {
  try {
    await prisma.garment.delete({
      where: { id },
    });

    revalidatePath("/admin/garments");
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se puede eliminar un producto con stock o movimientos." };
  }
}

/**
 * TOGGLE ACTIVE STATUS
 * Útil para pausar la venta de un producto sin borrarlo.
 */
export async function toggleGarmentStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.garment.update({
      where: { id },
      data: { active: !currentStatus },
    });

    revalidatePath("/admin/garments");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}