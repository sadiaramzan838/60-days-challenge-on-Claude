function ProfileCard({ name, niche }) {
  return (
    <div className="bg-white border rounded-xl p-5 h-full transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200">
      <h2 className="font-semibold text-gray-900">{name}</h2>
      <p className="text-sm text-gray-500 mt-0.5">{niche}</p>
    </div>
  )
}

export default ProfileCard