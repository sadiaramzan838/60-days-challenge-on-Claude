function ProfileCard({ name, niche }) {
  return (
    <div className="border rounded-lg p-5 hover:shadow-md transition">
      <h2 className="font-semibold text-gray-900">{name}</h2>
      <p className="text-sm text-gray-500">{niche}</p>
    </div>
  )
}

export default ProfileCard