import Link from "next/link";

export default function BlogPage() {
  const posts = [
    { slug: "post-1", title: "Bài viết 1" },
    { slug: "post-2", title: "Bài viết 2" },
  ];

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}