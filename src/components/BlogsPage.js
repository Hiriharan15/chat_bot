import React, { useState, useEffect } from "react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBlogs([
        {
          id: 1,
          title: "The Beauty of Kodaikanal",
          author: "Arun Kumar",
          date: "Feb 15, 2025",
          image: "./blog_1.jpg",
          description: "Kodaikanal, the 'Princess of Hill Stations', is known for its lush greenery, serene lakes, and cool weather.",
          url:"https://sajeevdev.com/exploring-the-serene-beauty-of-kodaikanal-a-travel-guide/"
        },
        {
          id: 2,
          title: "Chettinad Cuisine: A Culinary Delight",
          author: "Meena Ramesh",
          date: "Jan 30, 2025",
          image: "./blog2.jpg",
          description: "Chettinad cuisine is famous for its spicy flavors and aromatic spices, making it a must-try in Tamil Nadu.",
          url:"https://www.hidmc.com/blog-posts/chettinad-cuisine-exploring-the-flavors-of-tamil-nadu"
        },
        {
          id: 3,
          title: "Mahabalipuram: Ancient Wonders by the Sea",
          author: "Rajesh Nair",
          date: "Feb 10, 2025",
          image: "./blog3.jpg",
          description: "Mahabalipuram is a UNESCO Heritage site with ancient rock carvings and breathtaking seaside temples.",
          url:"https://www.tamilnadutourism.tn.gov.in/destinations/mahabalipuram"
        },
        {
          id: 4,
          title: "Ooty: The Queen of Hills",
          author: "Priya Srinivasan",
          date: "March 5, 2025",
          image: "./blog4.jpg",
          description: "Ooty, nestled in the Nilgiri Hills, is famous for its tea gardens, misty mountains, and colonial charm. A perfect getaway for nature lovers!",
          url:"https://briotravels.com/blog/the-ooty-travel-guide-a-pretty-wonderful-escape-into-the-queen-of-hill-stations/"
        },
        {
          id: 5,
          title: "Yercaud: Tamil Nadu’s Hidden Gem",
          author: "Naveen Kumar",
          date: "June 15, 2025",
          image: "./blog5.jpg",
          description: "Yercaud, a lesser-known hill station in Tamil Nadu, is famous for its coffee plantations, scenic viewpoints, and peaceful environment.",
          url:"https://www.agoda.com/travel-guides/india/yercaud/discover-yercauds-hidden-gems-your-ultimate-tourist-guide/"
        },  
        {
          id: 6,
          title: "Exploring the Mangrove Forests of Pichavaram",
          author: "Sandhya Ramesh",
          date: "September 22, 2025",
          image: "./blog6.jpg",
          description: "Take a boat ride through the Pichavaram Mangrove Forests, one of the largest in the world, best explored post-monsoon for a mesmerizing experience.",
          url:"https://www.thatgoangirl.com/exploring-the-mangrove-forest-of-pichavaram/"
        },
        {
          id: 7,
          title: "Kumbakonam Degree Coffee: A South Indian Classic",
          author: "Meera Venkat",
          date: "April 5, 2025",
          image: "./blog7.png",
          description: "Taste the rich, aromatic Kumbakonam Degree Coffee, a must-try for coffee lovers visiting Tamil Nadu.",
          url:"https://njwebdesigning.in/the-tale-of-kumbakonam-degree-coffee/"
        },
        {
          id: 8,
          title: "Jallikattu: The Thrilling Tradition of Tamil Nadu",
          author: "Karthik Rangan",
          date: "January 16, 2025",
          image: "./event.jpg",
          description: "Jallikattu, a centuries-old bull-taming sport, is an integral part of Tamil Nadu’s Pongal celebrations, showcasing bravery, tradition, and the deep connection between farmers and native bull breeds.",
          url:"https://www.cheggindia.com/daily-buzz/jallikattu-2025-bull-taming-festival/"
        
        },
        
  {
    id: 9,
    title: "Thanjavur Brihadeeswarar Temple: The Grandeur of Chola Architecture",
    author: "Arun Kumar",
    date: "Timeless Wonder",
    image: "./blog16.webp",
    description: "A UNESCO World Heritage site, the Brihadeeswarar Temple in Thanjavur is a masterpiece of Chola architecture, built by Raja Raja Chola I in the 11th century. The towering vimana and intricate carvings stand as a testament to Tamil Nadu’s glorious past.",
    url: "https://www.savaari.com/blog/chola-dynasty-temples-road-trip/"
  },
  {
    id: 10,
    title: "Isha Yoga Center: A Spiritual Retreat in Coimbatore",
    author: "Meera Subramanian",
    date: "Open Year-Round",
    image: "./blog10.webp",
    description: "Nestled at the foothills of the Velliangiri Mountains, the Isha Yoga Center is a spiritual haven established by Sadhguru. The iconic 112-foot Adiyogi Shiva statue symbolizes the science of yoga and attracts thousands of visitors.",
    url: "https://www.makemytrip.com/tripideas/attractions/isha-yoga-center"
  },
  {
    id: 11,
    title: "Kanyakumari: The Land Where Oceans Meet",
    author: "Ravi Shankar",
    date: "Best time to visit: October - March",
    image: "./blog12.webp",
    description: "Located at the southernmost tip of India, Kanyakumari is famous for its mesmerizing sunrise and sunset views, the Vivekananda Rock Memorial, and the convergence of the Arabian Sea, Bay of Bengal, and Indian Ocean.",
    url: "https://www.tamilnadutourism.tn.gov.in/destinations/kanyakumari"
  },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto p-4 sm:p-6 rounded-lg">
    {/* Page Title */}
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
      Explore Tamil Nadu
    </h1>

    {/* Loading & No Blogs Handling */}
    {loading ? (
      <p className="text-gray-500">Loading blogs...</p>
    ) : blogs.length === 0 ? (
      <p className="text-gray-500">No blogs found.</p>
    ) : (
      <div className="w-full max-w-4xl space-y-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 sm:h-64 object-cover"
            />

            {/* Blog Content */}
            <div className="p-4 sm:p-5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{blog.title}</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                By {blog.author} | {blog.date}
              </p>
              <p className="text-gray-700 mt-3 text-sm sm:text-base">
                {blog.description.substring(0, 150)}...
              </p>

              {/* Read More Button */}
              {/* <button className="mt-4 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Read More
              </button> */}
              <a
                  href={blog.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Read More
                </a>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default BlogsPage;
