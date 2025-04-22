"use client"
import { useState } from "react";
import { BlogContext } from "@/context/Context";

function BProvider({ children }) {
    const [article, setArticle] = useState(null);

    return (
        <BlogContext.Provider
          value={{
            article,
            setArticle
          }}>
            {children}
        </BlogContext.Provider>
    )
}

export default BProvider