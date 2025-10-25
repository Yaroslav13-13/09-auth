import { NextRequest, NextResponse } from "next/server";

/**
 * Приватні маршрути — доступні лише авторизованим користувачам
 */
const privateRoutes = ["/profile", "/notes"];

/**
 * Маршрути автентифікації — якщо користувач уже залогінений, перенаправляємо його на профіль
 */
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  /**
   * 🔹 Якщо користувач авторизований і намагається потрапити на /sign-in або /sign-up —
   * перекидаємо його на /profile
   */
  if (isAuthRoute && (accessToken || refreshToken)) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  /**
   * 🔸 Якщо користувач НЕ авторизований і намагається потрапити на приватну сторінку —
   * перекидаємо його на /sign-in
   */
  if (!accessToken && !refreshToken && isPrivateRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  /**
   * 🔹 Якщо токенів немає, але маршрут публічний — пропускаємо
   */
  return NextResponse.next();
}

/**
 * 🔹 Застосовуємо middleware лише для вказаних маршрутів
 */
export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
