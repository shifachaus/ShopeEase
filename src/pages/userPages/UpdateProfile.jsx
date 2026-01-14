import { useEffect, useState } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../features/users/userApi";
import {
  FormButton,
  FormImageRow,
  FormRow,
} from "../../component/admin/form/index";
import { toast } from "sonner";
import Breadcrumb from "../../component/Breadcrumb";

const initialValue = {
  name: "",
  email: "",
  avatar: "",
};

const UpdateProfile = () => {
  const [values, setValues] = useState(initialValue);

  const { data, isLoading: userLoading } = useGetUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [avatarPreview, setAvatarPreview] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setValues({ ...values, avatar: reader.result });
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const { email, name, avatar } = values;

    if (!email || !name || !avatar) {
      return toast.warning("Please fill out all fields");
    }
    try {
      await updateUser(values).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Update Profile error:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    if (!data?.user) return;
    setAvatarPreview(data?.user?.avatar?.url);

    setValues({
      email: data?.user?.email || "",
      name: data?.user?.name || "",
      avatar: data?.user?.avatar?.url || "",
    });
  }, [data]);

  if (userLoading) return null;

  return (
    <section>
      <Breadcrumb title={"Update profile"} profile={true} />
      <div className="flex items-center flex-col justify-center min-h-screen  px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Update Profile
          </h2>
          <form
            onSubmit={(e) => handleUpdateProfile(e)}
            className="px-5 pt-6 pb-8 "
          >
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />

            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />

            <FormImageRow
              handleFileUpload={handleFileUpload}
              avatarPreview={avatarPreview}
            />

            <FormButton isLoading={isLoading} name="Update Profile" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
