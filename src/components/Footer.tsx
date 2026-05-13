"use client";
import Image from "next/image";
import { Shirt } from "lucide-react";

export function Footer( { openPrivacy, openTerms }: { openPrivacy: () => void; openTerms: () => void } ) {
  return (
    <footer className="py-8 border-t border-celeste/20 mx-auto  bg-black text-gray-300/50 w-dvw max-w-dvw">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shirt width={'24'} height={'24'}/>
            <span className="font-semibold text-foreground">
              Mya{" "}<span className="text-primary">Imp</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Mya Imp.{" "} comercio online de importaciones.
          </p>

          <div className="flex gap-6">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={(e) => {
              e.preventDefault();
              openTerms();
            }}>

              Términos
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={(e) => {
              e.preventDefault();
              openPrivacy();
            }}>

              Privacidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
