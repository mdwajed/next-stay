// "use client";

// import { useRouter } from "next/navigation";
// import { useCallback, useEffect } from "react";

// const AuthModal = ({ children }) => {
//   const router = useRouter();

//   const closeModal = useCallback(() => {
//     router.back(); // Navigate back to the previous page
//   }, [router]);

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") closeModal();
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [closeModal]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative shadow-black/50">
//         <button
//           className="absolute top-4 font-extrabold right-4 text-gray-500 hover:text-gray-900"
//           onClick={closeModal}
//         >
//           ×
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { useCallback, useEffect } from "react";

// const AuthModal = ({ children }) => {
//   const router = useRouter();
//   const pathname = usePathname(); // Get current route

//   const closeModal = useCallback(() => {
//     router.back(); // Navigate back to the previous page
//   }, [router]);

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") closeModal();
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [closeModal]);

//   // Don't render modal if not on login or signup routes
//   if (pathname !== "/login" && pathname !== "/register") return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative shadow-black/50">
//         <button
//           className="absolute top-4 font-extrabold right-4 text-gray-500 hover:text-gray-900"
//           onClick={closeModal}
//         >
//           ×
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

export default function AuthModal({ children }) {
  const overlayRef = useRef(null);
  const modalWrapperRef = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClick}
      />

      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div
          ref={modalWrapperRef}
          className="bg-white rounded-xl shadow-2xl w-96 p-6 relative shadow-black/50"
        >
          <button
            className="absolute top-4 font-extrabold right-4 text-gray-500 hover:text-gray-900"
            onClick={onDismiss}
            aria-label="Close"
          >
            <Image src="/xmark.svg" alt="close" width={24} height={24} />
          </button>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
}
