import React, { useState, useEffect } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    setTimeout(() => {
      const allEvents = [
        {
          id: 1,
          title: "Pongal Festival",
          date: "January 14-17, 2025",
          eventDate: new Date("2025-01-14"),
          image: "./event1.jpg",
          description: "A harvest festival celebrated across Tamil Nadu with traditional food, kolams, and bull-taming sports like Jallikattu."
        },
        {
          id: 2,
          title: "Thaipusam Festival - Palani",
          date: "February 9, 2025",
          eventDate: new Date("2025-02-09"),
          image: "./event2.jpg",
          description: "A spiritual festival where devotees walk in processions carrying ‘Kavadi’ to Murugan temples, particularly in Palani."
        },
        {
          id: 3,
          title: "Chithirai Festival - Madurai",
          date: "April 2025",
          eventDate: new Date("2025-04-01"),
          image: "./event3.jpg",
          description: "One of the longest religious festivals in the world, celebrating the wedding of Lord Sundareswarar and Goddess Meenakshi."
        },
        {
          id: 4,
          title: "Mahamaham Festival - Kumbakonam",
          date: "Next in 2032",
          eventDate: new Date("2032-02-01"),
          image: "./event4.jpg",
          description: "A once-in-12-years Hindu festival where devotees take a holy dip in the Mahamaham tank in Kumbakonam."
        },
        {
          id: 5,
          title: "Natyanjali Dance Festival - Chidambaram",
          date: "March 2025",
          eventDate: new Date("2025-03-01"),
          image: "./event5.jpg",
          description: "A festival dedicated to Lord Nataraja, featuring classical dance performances at the Chidambaram temple."
        },
        {
          id: 6,
          title: "Kaanum Pongal & Tourist Fair - Chennai",
          date: "January 17, 2025",
          eventDate: new Date("2025-01-17"),
          image: "./event6.avif",
          description: "A day where families visit beaches, parks, and tourist fairs, with cultural performances and food festivals."
        },
        {
          id: 7,
          title: "Navaratri Festival",
          date: "September 22 - October 2, 2025",
          eventDate: new Date("2025-09-22"),
          image: "./event-7.jpeg",
          description: "Nine nights of music, dance, and devotion, celebrated with Golu displays and cultural performances."
        },
        {
          id: 8,
          title: "Deepavali (Diwali)",
          date: "October 20, 2025",
          eventDate: new Date("2025-10-20"),
          image: "./event-8.jpg",
          description: "The festival of lights, celebrated with firecrackers, sweets, and new clothes."
        },
        {
          id: 9,
          title: "Karthigai Deepam - Tiruvannamalai",
          date: "December 4, 2025",
          eventDate: new Date("2025-12-04"),
          image: "./event8.webp",
          description: "A grand festival where a giant lamp is lit on Arunachala Hill, symbolizing divine light."
        },
        {
          id: 10,
          title: "Aadi Perukku",
          date: "August 3, 2025",
          eventDate: new Date("2025-08-03"),
          image: "./event10.jpg",
          description: "A festival celebrating the monsoon and rivers, observed with prayers and offerings on riverbanks."
        },
      ];

      // Separate upcoming and past events based on the current date
      const upcomingEvents = allEvents.filter(event => event.eventDate >= today);
      const pastEvents = allEvents.filter(event => event.eventDate < today);

      setEvents({ upcoming: upcomingEvents, past: pastEvents });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Events in Tamil Nadu</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : (
        <>
          {/* Upcoming Events Section */}
          {events.upcoming.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-grey-600 mb-4">Upcoming Events ...</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.upcoming.map((event) => (
                  <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h2 className="text-xl font-bold">{event.title}</h2>
                      <p className="text-gray-600 text-sm mt-2">{event.date}</p>
                      <p className="text-gray-700 mt-2">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Events Section */}
          {events.past.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-500 mb-4">Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.past.map((event) => (
                  <div key={event.id} className="bg-gray-200 shadow-md rounded-lg overflow-hidden opacity-80">
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h2 className="text-xl font-bold">{event.title}</h2>
                      <p className="text-gray-600 text-sm mt-2">{event.date}</p>
                      <p className="text-gray-700 mt-2">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsPage;
