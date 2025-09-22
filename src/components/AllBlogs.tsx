import { usePageData } from "rspress/runtime";

export default function BlogList() {
  const { siteData } = usePageData();

  // Get all blog pages under /blogs/allBlogs
  const allBlogs = siteData.pages.filter((p) =>
    p.routePath.startsWith("/blogs/allBlogs")
  );

  
  // Sort by date (if available)
  const sortedBlogs = allBlogs.sort((a, b:any) =>
    (b.frontmatter?.date || "").localeCompare(a.frontmatter?.date || "")
);

// Pick top 3
const topBlogs = sortedBlogs.slice(0, 3);
console.log(topBlogs);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>📰 Latest Blogs</h2>
      <ul>
        {topBlogs.map((blog) => (
          <li key={blog.routePath}>
            <a href={blog.routePath}>
              {blog.frontmatter?.title || "Untitled"}
            </a>
            <p>{blog.frontmatter?.description || "No description"}</p>
          </li>
        ))}
      </ul>
      <p>
        👉 <a href="/blogs/">See all blogs</a>
      </p>
    </div>
  );
}
