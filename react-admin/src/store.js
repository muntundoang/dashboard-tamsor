import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const initialState = {
  user: {},
  absen: [],
  access_token: null,
  categoryList: [],
  stockList: [],
  brandList: [],
  loading: false,
  editProduct: null,
};

export const store = create(
  devtools((set, get) => ({
    ...initialState,
    setUser: (user) => set(() => ({ user: user })),
    setToken: (token) => set(() => ({ access_token: token })),
    reset: () => set(initialState),
    postAbsen: async () => {
      try {
        set({loading: true})
        const { data } = await axios.post("http://localhost:3001/user/absen", {
          access_token: get().access_token,
        });
        const refetchUser = get().fetchUser
        await refetchUser()
        setTimeout(() => {
          set({loading: false})
        }, 4000)
        return data.message;
      } catch (error) {
        set({loading: false})
        console.log("error dari fetchUser ==>", error);
      }
    },
    fetchUser: async () => {
      try {
        set({loading: true})
        const { data } = await axios.post("http://localhost:3001/auth", {
          access_token: get().access_token,
        });
        set({ user: await data.user });
        set({ absen: await data.absen });
        setTimeout(() => {
          set({loading: false})
        }, 1000)
        return get().user;
      } catch (error) {
        console.log("error dari fetchUser ==>", error);
        set({loading: false})
      }
    },
    login: async (username, password) => {
      try {
        set({loading: true})
        const { data } = await axios.post("http://localhost:3001/user/login", {
          username,
          password,
        });
        if (data) {
          const { access_token, user } = data;
          localStorage.setItem("access_token", access_token);
          set({ access_token: access_token });
          set({ user: user });
          setTimeout(() => {
            set({loading: false})
          }, 1000)
          return user;
        }
        setTimeout(() => {
          set({loading: false})
        }, 1000)
      } catch (error) {
        console.log(error);
        set({loading: false})
      }
    },
    register: async (obj) => {
      try {
        set({loading: true})
        const { data } = await axios.post(
          "http://localhost:3001/user/register",
          obj
        );
        if (data) {
          set({loading: false})
          return data.message;
        }
        set({loading: false})
      } catch (error) {
        console.log("error di store register ==>", error);
        set({loading: false})
      }
    },
    addStockProduct: async (obj) => {
      try {
        set({loading: true})
        const { data } = await axios.post(
          "http://localhost:3001/inventory/addProduct",
          obj
        );
        if (data) {
          const arrProduct = get().stockList;
          const arrBrand = get().brandList;
          let flag = false;

          for (let i = 0; i < arrBrand.length; i++) {
            if (arrBrand[i] === data.product.brand) {
              flag = true;
            }
          }

          const newArrProduct = [...arrProduct, data.product];
          set({ stockList: newArrProduct });

          if (!flag) {
            const newArrBrand = [...arrBrand, data.product.brand];
            set({ brandList: newArrBrand });
          }
          set({loading: false})
          return data.message;
        }
      } catch (error) {
        console.log("error di store addStockProduct ==>", error);
        set({loading: false})
      }
    },
    getCategoryList: async () => {
      try {
        set({loading: true})
        const { data } = await axios.get(
          "http://localhost:3001/inventory/getCategoryList"
        );
        if (data) {
          set({ categoryList: data.categoryList });
        }
        set({loading: false})
      } catch (error) {
        console.log("error di store getCategoryList ==>", error);
        set({loading: false})
      }
    },
    getProductList: async () => {
      try {
        set({loading: true})
        const { data } = await axios.get(
          "http://localhost:3001/inventory/getProductList"
        );
        if (data) {
          const brands = data.items.map((e) => {
            return e.brand;
          });
          set({ stockList: data.items });
          set({ brandList: brands });
        }
        console.log("data stock list ==> ", get().stockList);
        set({loading: false})
      } catch (error) {
        console.log("error di store getProductList ==>", error);
        set({loading: false})
      }
    },
    setEditProduct: (id) => {
      try {
        set({loading: true})
        const items = get().stockList;
        let obj;
        items.forEach((e) => {
          if (e.id === id) {
            obj = e;
          }
        });
        set({ editProduct: obj });
        console.log("data editProduct ==> ", get().editProduct);
        set({loading: false})
      } catch (error) {
        console.log("error di store editProduct ==>", error);
        set({loading: false})
      }
    },
    resetProductStock: (obj) => {
      try {
        set({loading: true})
        const items = get().stockList;
        if (obj.currentStock <= obj.safetyStock) {
          obj.needRestock = true;
        } else {
          obj.needRestock = false;
        }
        const editedList = items.map((e) => {
          if (e.id === obj.id) {
            e = obj;
          }
          return e;
        });
        set({ stockList: editedList });
        set({loading: false})
      } catch (error) {
        console.log("error di store resetProductStock ==>", error);
        set({loading: false})
      }
    },
    postProductStock: async () => {
      try {
        set({loading: true})
        const arr = get().stockList;
        const { data } = axios.patch(
          "http://localhost:3001/inventory/updateCurrentStock",
          arr
        );
        if (data) {
          set({loading: false})
          return data;
        }
        set({loading: false})
      } catch (error) {
        console.log("error di store postProductStock ==>", error);
        set({loading: false})
      }
    },
    postEditProduct: async (obj) => {
      try {
        set({loading: true})
        const { data } = await axios.patch(
          "http://localhost:3001/inventory/editProduct",
          obj
        );
        if (data.edited) {
          const item = data.edited;
          const temp = get().stockList;
          let stockList = temp.map((e) => {
            if (e.id === item.id) {
              e = item;
            }
            return e;
          });
          set({ stockList: stockList });
          set({loading: false})
          return data.message;
        }
      } catch (error) {
        console.log("error di store editProduct ==>", error);
        set({loading: false})
      }
    },
    editCategoryList: async (obj, idCategory) => {
      try {
        set({loading: true})
        const { data } = await axios.patch(
          `http://localhost:3001/inventory/editCategory/${idCategory}`,
          obj
        );

        if (data) {
          let arr = get().categoryList;
          arr.forEach((e) => {
            if (e.id === obj.id) {
              e.name = obj.name;
            }
          });
          set({ categoryList: arr });
        }
        set({loading: false})
        return data;
      } catch (error) {
        set({loading: false})
        console.log("error di store editCategoryList ==>", error);
      }
    },
    deleteCategoryList: async (e, idCategory) => {
      e.preventDefault();
      try {
        set({loading: true})
        const { data } = await axios.post(
          `http://localhost:3001/inventory/deleteCategory/${idCategory}`
        );
        if (!data.error) {
          const arr = get().categoryList;
          let temp = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id !== idCategory) {
              temp.push(arr[i]);
            }
          }
          const { getProductList } = get();
          getProductList();
          console.log("newArr ==>", temp);
          set({ categoryList: temp });
          console.log("list category => ", get().categoryList);
        }
        set({loading: false})
        return data;
      } catch (error) {
        console.log("error di store deleteCategoryList ==>", error);
        set({loading: false})
      }
    },
    deleteStockList: async (idProduct) => {
      try {
        set({loading: true})
        const { data } = await axios.post(
          `http://localhost:3001/inventory/deleteProduct/${idProduct}`
        );
        if (!data.error) {
          const arr = get().stockList;
          let temp = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id !== idProduct) {
              temp.push(arr[i]);
            }
          }
          console.log("newArr ==>", temp);
          set({ stockList: temp });
          console.log("list category => ", get().stockList);
        }
        set({loading: false})
        return data;
      } catch (error) {
        console.log("error di store deleteCategoryList ==>", error);
        set({loading: false})
      }
    },
    createCategoryList: async (obj) => {
      try {
        set({loading: true})
        const { data } = await axios.post(
          `http://localhost:3001/inventory/addCategory`,
          obj
        );
        if (!data.error) {
          const arr = get().categoryList;
          let temp = [...arr, data.category];
          console.log("newArr ==>", temp);
          set({ categoryList: temp });
        }
        set({loading: false})
        return data;
      } catch (error) {
        console.log("error di store deleteCategoryList ==>", error);
        set({loading: false})
      }
    },
  }))
);
