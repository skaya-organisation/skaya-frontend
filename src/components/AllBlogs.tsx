import { usePageData } from "rspress/runtime";
import "../index.css";
export default function BlogList() {
  const { siteData } = usePageData();

  // Get all blog pages under /blogs/allBlogs
  const allBlogs = siteData.pages.filter((p) =>
    p.routePath.startsWith("/blogs/allBlogs")
  );

  // Sort by date (if available)
  const sortedBlogs = allBlogs.sort((a, b: any) =>
    (b.frontmatter?.date || "").localeCompare(a.frontmatter?.date || "")
  );

  // Pick top 3
  const topBlogs = sortedBlogs.slice(0, 3);
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topBlogs.map((blog: any) => (
          <div
            key={blog.routePath}
            className="p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition m-4"
            style={{
              marginLeft: "10px",
            }}
          >
            <a
              href={blog.routePath}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {blog.frontmatter?.title || "Untitled"}
            </a>
            <p className="text-gray-700 mt-2">
              {blog.frontmatter?.description || "No description"}
            </p>
            <small className="text-gray-500 mt-1 block">
              {blog.frontmatter?.date || ""}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
