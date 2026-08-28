"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  HiXMark,
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlassPlus,
  HiMagnifyingGlassMinus,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";

export interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  orientation?: "horizontal" | "vertical" | "square" | "auto" | string;
}

interface OpenLightboxOptions {
  images: (string | LightboxImage)[];
  initialIndex?: number;
  title?: string;
}

interface LightboxContextType {
  openLightbox: (options: OpenLightboxOptions) => void;
  closeLightbox: () => void;
  isOpen: boolean;
}

const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {},
  closeLightbox: () => {},
  isOpen: false,
});

export const useLightbox = () => useContext(LightboxContext);

export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTitle, setActiveTitle] = useState<string | undefined>();
  const [imageLoading, setImageLoading] = useState(true);

  // Touch gesture state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = useCallback(
    ({ images: rawImages, initialIndex = 0, title }: OpenLightboxOptions) => {
      if (!rawImages || rawImages.length === 0) return;

      const normalized: LightboxImage[] = rawImages.map((img) => {
        if (typeof img === "string") {
          return { src: img, alt: title || "Photography" };
        }
        return img;
      });

      setImages(normalized);
      setCurrentIndex(Math.max(0, Math.min(initialIndex, normalized.length - 1)));
      setActiveTitle(title);
      setIsZoomed(false);
      setImageLoading(true);
      setIsOpen(true);
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
  }, []);

  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setIsZoomed(false);
    setImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    setIsZoomed(false);
    setImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeLightbox, nextImage, prevImage, toggleZoom]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe (next/prev)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
    // Vertical swipe down (dismiss)
    else if (diffY > 100 && Math.abs(diffX) < 60 && !isZoomed) {
      closeLightbox();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentImg = images[currentIndex];
  const hasMultiple = images.length > 1;

  const modalContent = isOpen && currentImg && mounted && (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(5, 5, 5, 0.94)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        userSelect: "none",
        animation: "lightboxFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeLightbox();
        }
      }}
    >
      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightboxZoomIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .lightbox-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f5f5f5;
          border-radius: 9999px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .lightbox-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }
        .lightbox-btn:active {
          background: rgba(255, 255, 255, 0.28);
        }
        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          font-size: 24px;
          z-index: 20;
        }
        .lightbox-nav-btn:hover,
        .lightbox-nav-btn:active {
          transform: translateY(-50%);
        }
        @media (max-width: 640px) {
          .lightbox-nav-btn {
            width: 42px;
            height: 42px;
            font-size: 20px;
          }
        }
      `}</style>

      {/* Top Header Bar */}
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          zIndex: 30,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      >
        {/* Left: Counter & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {hasMultiple && (
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "rgba(255, 255, 255, 0.8)",
                padding: "6px 12px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              {currentIndex + 1} / {images.length}
            </div>
          )}
          {(activeTitle || currentImg.title) && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: "320px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentImg.title || activeTitle}
            </span>
          )}
        </div>

        {/* Right: Actions (Zoom, Close) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            className="lightbox-btn"
            style={{ width: "40px", height: "40px", fontSize: "18px" }}
            onClick={toggleZoom}
            title={isZoomed ? "Reset Zoom" : "Zoom In (Space)"}
            aria-label={isZoomed ? "Reset Zoom" : "Zoom In"}
          >
            {isZoomed ? <HiMagnifyingGlassMinus /> : <HiMagnifyingGlassPlus />}
          </button>

          <button
            type="button"
            className="lightbox-btn"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            onClick={closeLightbox}
            title="Close Lightbox (Esc)"
            aria-label="Close Lightbox"
          >
            <HiXMark />
          </button>
        </div>
      </header>

      {/* Main Image Area */}
      <main
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 20px",
          overflow: isZoomed ? "auto" : "hidden",
          cursor: isZoomed ? "zoom-out" : "zoom-in",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeLightbox();
          } else {
            toggleZoom();
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        {hasMultiple && (
          <button
            type="button"
            className="lightbox-btn lightbox-nav-btn"
            style={{ left: "20px" }}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            title="Previous (Left Arrow)"
            aria-label="Previous image"
          >
            <HiChevronLeft />
          </button>
        )}

        {/* Loading Spinner */}
        {imageLoading && (
          <div
            style={{
              position: "absolute",
              width: "36px",
              height: "36px",
              border: "3px solid rgba(255,255,255,0.15)",
              borderTopColor: "#ffffff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              pointerEvents: "none",
            }}
          />
        )}

        {/* The Fullscreen Image Container with Anti-Save Guard */}
        <div
          key={currentImg.src}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{
            position: "relative",
            maxWidth: isZoomed ? "140vw" : "92vw",
            maxHeight: isZoomed ? "140vh" : "82vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isZoomed ? "scale(1.35)" : "scale(1)",
            animation: "lightboxZoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {/* Transparent protection layer to prevent right-click save and touch-hold save */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              userSelect: "none",
              WebkitUserSelect: "none",
              pointerEvents: "none",
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImg.src}
            alt={currentImg.alt || "Photography item"}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            onLoad={() => setImageLoading(false)}
            style={{
              maxWidth: "100%",
              maxHeight: isZoomed ? "none" : "82vh",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          />
        </div>

        {/* Next Button */}
        {hasMultiple && (
          <button
            type="button"
            className="lightbox-btn lightbox-nav-btn"
            style={{ right: "20px" }}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            title="Next (Right Arrow)"
            aria-label="Next image"
          >
            <HiChevronRight />
          </button>
        )}
      </main>

      {/* Bottom Footer & Caption */}
      <footer
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 24px 20px 24px",
          zIndex: 30,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      >
        {currentImg.alt && (
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.85)",
              textAlign: "center",
              maxWidth: "600px",
              letterSpacing: "0.01em",
            }}
          >
            {currentImg.alt}
          </p>
        )}

        {/* Thumbnails dots indicator if multiple images */}
        {hasMultiple && images.length <= 15 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "10px",
            }}
          >
            {images.map((_, dotIdx) => (
              <button
                key={`dot-${dotIdx}`}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setImageLoading(true);
                  setCurrentIndex(dotIdx);
                }}
                style={{
                  width: currentIndex === dotIdx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor:
                    currentIndex === dotIdx
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.25)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-label={`Go to image ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </footer>
    </div>
  );

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox, isOpen }}>
      {children}
      {mounted && typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </LightboxContext.Provider>
  );
};
