"use client"
import { createContext, useContext } from "react";

export const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);