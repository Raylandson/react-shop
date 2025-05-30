import React, { useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  title: string;
  products: Product[];
  icon?: React.ReactNode;
  autoScrollIntervalDelay?: number;
  restartAutoScrollDelay?: number;
}

function ProductList({
  title,
  products,
  icon,
  autoScrollIntervalDelay = 5000,
  restartAutoScrollDelay = 7000,
}: ProductListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalIdRef = useRef<number | null>(null);
  const restartTimeoutIdRef = useRef<number | null>(null);

  const scrollAmount = 300;

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      if (scrollLeft >= scrollWidth - clientWidth - 1) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  }, [scrollAmount]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalIdRef.current !== null) {
      clearInterval(autoScrollIntervalIdRef.current);
      autoScrollIntervalIdRef.current = null;
    }
    if (restartTimeoutIdRef.current !== null) {
      clearTimeout(restartTimeoutIdRef.current);
      restartTimeoutIdRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    autoScrollIntervalIdRef.current = window.setInterval(
      scrollRight,
      autoScrollIntervalDelay
    );
  }, [autoScrollIntervalDelay, scrollRight, stopAutoScroll]);

  useEffect(() => {
    if (
      products &&
      products.length > 0 &&
      scrollContainerRef.current &&
      scrollContainerRef.current.scrollWidth >
        scrollContainerRef.current.clientWidth
    ) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [products, startAutoScroll, stopAutoScroll]);

  const handleManualScrollAction = useCallback(() => {
    stopAutoScroll();
    restartTimeoutIdRef.current = window.setTimeout(() => {
      startAutoScroll();
    }, restartAutoScrollDelay);
  }, [restartAutoScrollDelay, startAutoScroll, stopAutoScroll]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
    handleManualScrollAction();
  };

  const handleManualScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
    handleManualScrollAction();
  };

  if (!products || products.length === 0) {
    return null;
  }
  const scrollButtonClass: string =
    "top-1/2 absolute transform -translate-y-1/2 z-20 bg-amber-600 bg-opacity-40 text-white p-2 rounded-full focus:outline-none transition-opacity active:bg-opacity-75 hover:shadow-xl hover:scale-105 hover:brightness-110";

  return (
    <div className="mb-10">
      <div className="flex gap-2 items-center ml-4 mb-3">
        {icon}
        <h1 className="text-3xl text-white text-left">{title}</h1>
      </div>
      <div className="relative w-full">
        <button
          onClick={handleScrollLeft}
          className={"left-0 sm:left-2 " + scrollButtonClass}
          aria-label="Scroll Left"
        >
          <ChevronLeft size={28} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-hidden scrollbar-hide w-full px-12 sm:px-16" // Padding para não cortar cards sob as setas
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <button
          onClick={handleManualScrollRight}
          className={"right-0 sm:right-2 " + scrollButtonClass}
          aria-label="Scroll Right"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}

export default ProductList;
