import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-5">{user?.name}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <div className="mt-10 grid gap-5">
          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-700">Full Name</h2>
            <p className="text-gray-600 mt-1">{user?.name}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-700">
              Email Address
            </h2>
            <p className="text-gray-600 mt-1">{user?.email}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-700">
              Account Status
            </h2>

            <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Active
            </span>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-700">CareerForge</h2>
            <p className="text-gray-600 mt-1">
              Build, manage and download professional ATS-friendly resumes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
