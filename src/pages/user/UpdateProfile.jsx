import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../../utils/userApi";
import { FormButton, FormImageRow, FormRow } from "../../component";

const initialValue = {
  name: "",
  email: "",
  avatar: "",
};

const UpdateProfile = () => {
  const [values, setValues] = useState(initialValue);

  const { data } = useGetUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const getUserQuery = useGetUserQuery();

  const [avatarPreview, setAvatarPreview] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleFileUpload = (e) => {
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
      alert("Please fill out all fields");
      return;
    }
    try {
      const data = await updateUser(values);
      await getUserQuery.refetch();
    } catch (err) {
      console.error("Update Profile error:", err);
    }
  };

  useEffect(() => {
    setAvatarPreview(data?.user?.avatar?.url);

    setValues({
      email: data?.user?.email || "",
      name: data?.user?.name || "",
      avatar: data?.user?.avatar?.url || "",
    });
  }, [data]);

  return (
    <div className="mx-auto max-w-md mt-6 p-6 lg:px-8 h-screen">
      <div className=" bg-white shadow-lg rounded  mb-4 ">
        <h2 className="text-2xl font-medium mb-2 text-center text-gray-600">
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

          <FormButton isLoading={isLoading} name={"Update"} />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
