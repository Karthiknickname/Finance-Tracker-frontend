import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) return setError("Please enter your name");
    if (!validateEmail(email)) return setError("Please enter a valid email address");
    if (!password) return setError("Please enter the password");

    let profileImageUrl = "";

    try {
      setLoading(true);

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div className="col-span-1"></div> */}
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
            className="w-full"
          />
            <div className="col-span-1"></div>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
              className="w-full"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
                className="w-full"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-blue-600 underline" to="/Login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
