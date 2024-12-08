import {client} from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const blogs = await client.fetch(`
  *[_type=="blogs"]{
  _id,
  image,
  heading,
  "category": category->category,
  "author": author->author,
    publishAt
  }
  `,{},{cache:"no-store"})

  return (
    <div className="main sm:px-6 lg:px-8">
  <div className="space-y-4">
    {blogs.map((blog, index) => (
      <div
        key={index}
        className="blog-section  sm:flex-row"
      >
        {/* Image Section */}
        <Image
          className="blog-section-img sm:w-1/3"
          alt={blog.heading}
          src={urlFor(blog.image).url()}
          width={200}
          height={200}
        />

        {/* Text Section */}
        <div className="card flex flex-col  sm:w-2/3">
          <div className="datetime">
            <span className="text-[16px] text-gray-500">{blog.category}</span>
            <span>|</span>
            <span className="text-[16px] text-gray-500">
              {new Intl.DateTimeFormat("en-US",{
                year:"numeric",
                month:"long",
                day:"2-digit",
                hour:"2-digit",
                minute:"2-digit",
                hour12: true,
              }).format(new Date(blog.publishAt)).replace(" at ", ", ")}
            </span>
          </div>
          <h3 className="heading ">
            {blog.heading}
          </h3>
          <p className="author flex-grow">by {blog.author}</p>
          <Link href={`/detail/${blog._id}`} className="read_more">Read More</Link>
        </div>
        
      </div>
    ))}
  </div>
</div>


  );
}
