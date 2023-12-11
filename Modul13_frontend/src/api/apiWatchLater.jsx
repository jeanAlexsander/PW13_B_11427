import useAxios from ".";

// Mendapatkan semua content user yang sedang login
export const GetWatchLater = async () => {
    try {
      const response = await useAxios.get(`/watchlaters`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

// Membuat content baru
export const CreateWatchLater = async (id_content) => {
  try {
    console.log(id_content + "ini data");
    const response = await useAxios.post("/watch_laters", {id_content}, {
      headers: {
        "Content-Type": "multipart/form-data", 
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Menghaspu content
export const DeleteWatchLater = async (id) => {
  try {
    const response = await useAxios.delete(`/watch_laters/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
