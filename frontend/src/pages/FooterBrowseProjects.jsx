import React from 'react'

const FooterBrowseProjects = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">Browse Projects</h1>

      <div className="max-w-4xl mx-auto text-gray-400 space-y-6">
        <p>
          Explore a wide range of projects posted by clients from around the world.
          You can filter projects based on skills, budget, and category.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Search projects using keywords</li>
          <li>Filter by budget and skills</li>
          <li>View project details before applying</li>
          <li>Submit your contribution directly</li>
        </ul>

        <p>
          Our platform ensures fair evaluation and payment based on your contribution.
        </p>
      </div>
    </div>
  )
}

export default FooterBrowseProjects