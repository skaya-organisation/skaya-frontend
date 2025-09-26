import { usePageData } from "rspress/runtime";

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
console.log(sortedBlogs);

  // Pick top 3

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBlogs.map((blog: any) => (
          <div
            key={blog.routePath}
            className="p-6 m-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition bg-white dark:bg-gray-800"
          >
            <a
              href={`${blog.routePath}.html`}
              className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {blog.frontmatter?.title || "Untitled"}
            </a>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              {blog.frontmatter?.description || "No description"}
            </p>
            <small className="text-gray-500 dark:text-gray-400 mt-1 block">
              {blog.frontmatter?.date || ""}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}