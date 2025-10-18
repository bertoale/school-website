import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import Pendaftar from "../models/pendaftar.js";
import Admin from "../models/admin.js";

// Middleware umum untuk melindungi semua endpoint
const protectedMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "admin") {
      const admin = await Admin.findById(decoded.id).select("-password");
      if (!admin) {
        res.status(401);
        throw new Error("Admin not found");
      }
      req.user = admin;
    } else if (decoded.role === "pendaftar") {
      const pendaftar = await Pendaftar.findById(decoded.id).select(
        "-password"
      );
      if (!pendaftar) {
        res.status(401);
        throw new Error("Pendaftar not found");
      }
      req.pendaftar = pendaftar;
    } else {
      res.status(401);
      throw new Error("Unknown role");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized, token invalid");
  }
});

// Middleware untuk membatasi akses berdasarkan role
const checkRole =
  (...allowedRoles) =>
  (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      res.status(403);
      throw new Error("Forbidden: Anda tidak punya akses ke sumber ini");
    }
    next();
  };

export { protectedMiddleware, checkRole };

// const protectedMiddleware = asyncHandler(async (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     res.status(401);
//     throw new Error("Not Authorized, no token");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const pendaftar = await Pendaftar.findById(decoded.id).select("-password");

//     if (!pendaftar) {
//       res.status(401);
//       throw new Error("Not Authorized, pendaftar tidak ditemukan");
//     }

//     req.pendaftar = pendaftar;
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("Not Authorized, token invalid");
//   }
// });
