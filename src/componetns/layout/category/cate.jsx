import React, { useState } from 'react'
import Metadata from '../home/componetns/layout/Metadata'
import Loader from '../../../Loder/loder';

const callouts = [
    {
      name: 'Kids School Bags',
      description: 'Carry Your Dreams with Every Step: Our Bags Make the Journey Memorable!',
      imageSrc: 'https://img.freepik.com/premium-photo/schoolboy-uniform-with-backpack-jumping_127093-2400.jpg',
      ImageAlt: 'School bag with textbooks, notebooks, pens, pencils, calculator, and water bottle.',
         href: '#',
    },
    {
      name: 'Gym Bags For EveryOne',
      description: ' Elevate Your Gains: Gym Bag Designed for Progress and Performance.',
      imageSrc: 'https://img.freepik.com/premium-photo/young-caucasian-sport-man-with-sport-bag-isolated-blue-background-having-doubts-thinking_1368-350604.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
        name: "Girls Kurti",
        description: "Elevate your wardrobe with our stunning collection of kurtis for girls. From vibrant prints to intricate embroidery.",
        imageSrc: "https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17500.jpg?t=st=1690969749~exp=1690970349~hmac=71ef2cfaab31a6cf3b5316c4daa89f1be1330e4b3947a129af03c19eae52a159",
        imageAlt: "Young woman wearing a beautiful red kurti dress.",
        href: "#"
    },
    {
        name: "StylishStride Shoes",
        description: "Step up your fashion game with our collection of stylish and comfortable shoes.",
        imageSrc: 'https://img.freepik.com/premium-photo/fashion-male-sport-shoes-blue-background-stylish-man-sneakers-fitness-close-up_77190-1693.jpg',
        imageAlt: "Pair of stylish shoes on a wooden floor.",
        href: '#',
      },
      {
        name: "ClassicCharm Shirts",
        description: "Timeless shirts that effortlessly blend style and comfort for a sophisticated everyday look.",
        imageSrc: "https://img.freepik.com/free-photo/clothing-rack-with-floral-hawaiian-shirts-hangers-hat_23-2149366018.jpg?size=626&ext=jpg&ga=GA1.2.1256473120.1690969360&semt=sph",
        imageAlt: "Collection of stylish shirts on display.",     
        href: "#"
      },
      {
        name: "CartoonAdventures Bags",
        description: "Embark on magical journeys with our delightful cartoon bags, designed to bring joy to every adventure.",
        imageSrc: "https://www.disneyfoodblog.com/wp-content/uploads/2021/04/Mickey-Mouse-Classic-Backpack-by-Herschel.jpg",
        imageAlt: "Collection of stylish shirts on display.",     
        href: "#"
      },
  ]
  
const Cate = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  return (
    <div className="bg-gray-100">
      
      {loading && <Loader />}

      <Metadata title="Category" />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <h2 className="text-2xl font-bold text-gray-900">Our Collections</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {callouts.map((callout) => (
            <div key={callout.name} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={callout.imageSrc}
                  alt={callout.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href={callout.href}>
                  <span className="absolute inset-0" />
                  {callout.name}
                </a>
              </h3>
              <p className="text-base font-semibold text-gray-900">{callout.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)
}


export default Cate