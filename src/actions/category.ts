"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Definimos un tipo de respuesta para que TypeScript no infiera 'void'
type ActionResponse = {
  success: boolean;
  error?: string;
};

export async function createCategory(data: any): Promise<ActionResponse> {
  try {
    await prisma.category.create({
      data: {
        name: data.name,
        active: true,
        sizeTypeId: data.sizeTypeId || null,
      },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo crear la categoría" };
  }
}

export async function updateCategory(id: string, data: any): Promise<ActionResponse> {
  try {
    await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        active: data.active,
        sizeTypeId: data.sizeTypeId || null,
      },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al actualizar la categoría" };
  }
}

export async function deleteCategory(id: string): Promise<ActionResponse> {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se puede eliminar: tiene productos vinculados" };
  }
}