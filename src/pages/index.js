import { getProducts } from "@/services/queries";
import { useState, useEffect } from "react";
import AddProductModal from "@/components/modals/AddProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";
import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/router";

function ProductsPage() {
  const { push } = useRouter();
  const token = getCookie("token");
  const [add, setAdd] = useState(false);
  const [deleteProductModal, setProductDeleteModal] = useState([false, null]);
  const [edit, setEdit] = useState([false, ""]);
  const [showMessage, setShowMessage] = useState("");
  const [search, setSearch] = useState([]);
  const { data, refetch } = getProducts();

  useEffect(() => {
    if (!token) {
      push("/login");
    }
  }, [token]);
  const searchHandler = (e) => {
    setShowMessage("");
    const result = data.data.data.filter((item) =>
      item.name.includes(e.target.value)
    );
    if (result.length > 0) {
      setSearch(result);
    } else {
      setShowMessage("کالایی با این اسم پیدا نشد!");
    }
    console.log(result);
  };

  return (
    <>
      {add && <AddProductModal setAdd={setAdd} refetch={refetch} />}
      {edit[0] && (
        <EditProductModal setEdit={setEdit} edit={edit} refetch={refetch} />
      )}
      {deleteProductModal[0] && (
        <DeleteProductModal
          deleteProductModal={deleteProductModal}
          setProductDeleteModal={setProductDeleteModal}
          refetch={refetch}
        />
      )}
      <div className="flex mx-auto relative justify-center items-center rounded-2xl w-[1145px] h-[68px] bg-[#ffffff]">
        <span className="absolute right-5">
          <img src="/search-normal.svg" className="size-6" alt="search icon" />
        </span>

        <input
          onChange={searchHandler}
          type="text"
          placeholder="جستجوی کالا"
          className="pr-14 w-full placeholder:text-[#00000099] bg-inherit outline-none"
        />
        <div className="flex border-r   border-[#E4E4E4] mr-5 px-5 gap-x-5">
          <img src="/Manager.png" className="rounded-full" alt="" />
          <div className="flex flex-col text-right w-[129px]">
            <span className="text-[#282828]">میلاد عظمی</span>
            <span className="text-[#282828] font-light">مدیر</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-[1140px] mt-11 mx-auto">
        <span className="flex gap-x-2">
          <img
            src="/setting-3.svg"
            className="size-8 mt-1.5"
            alt="setting-icon"
          />
          <span className="font-normal min-w-fit text-[24px] text-[#282828]">
            مدیریت کالا
          </span>
        </span>
        <button
          onClick={() => {
            setAdd(true);
            document.body.style.overflow = "hidden";
          }}
          className="bg-[#55A3F0] rounded-xl text-[#ffffff] px-3 tracking-wider h-11 pb-1"
        >
          افزودن محصول
        </button>
      </div>
      <div className="w-[1140px] mx-auto mt-3">
        <div className="grid myGrid14 px-10 w-full rounded-t-2xl h-[70px] items-center bg-[#F2F2F2]">
          <span className="col-span-3 text-[#282828] font-medium text-[14px]">
            نام کالا
          </span>
          <span className="col-span-3 text-[#282828] font-medium text-[14px]">
            موجودی
          </span>
          <span className="col-span-3 text-[#282828] font-medium text-[14px]">
            قیمت
          </span>
          <span className="col-span-5 text-[#282828] font-medium text-[14px]">
            شناسه کالا
          </span>
        </div>
        {data?.data.data.length ? (
          search.length > 0 ? (
            showMessage.length > 0 ? (
              <div className="grid myGrid14 px-10 w-full h-[70px] items-center last:rounded-b-2xl bg-[#ffffff]">
                <span className="col-span-full text-center">
                  {" "}
                  {showMessage}
                </span>
              </div>
            ) : (
              search.map((item) => (
                <div
                  key={item.id}
                  className="grid myGrid14 px-10 w-full h-[70px] items-center last:rounded-b-2xl bg-[#ffffff]"
                >
                  <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                    {item.name}
                  </span>
                  <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                    {item.quantity}
                  </span>
                  <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                    {item.price}
                  </span>
                  <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                    {item.id}
                  </span>
                  <span className="col-span-2 flex text-[#282828] font-normal text-[12px] justify-end gap-x-4">
                    <button onClick={() => setEdit([true, item.id])}>
                      <img src="/edit.svg" alt="edit icon" />
                    </button>
                    <button
                      onClick={() => setProductDeleteModal([true, item.id])}
                    >
                      <img src="/trash.svg" alt="delete icon" />
                    </button>
                  </span>
                </div>
              ))
            )
          ) : (
            data?.data.data.map((item) => (
              <div
                key={item.id}
                className="grid myGrid14 px-10 w-full h-[70px] items-center last:rounded-b-2xl bg-[#ffffff]"
              >
                <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                  {item.name}
                </span>
                <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                  {item.quantity}
                </span>
                <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                  {item.price}
                </span>
                <span className="col-span-3 text-[#282828] font-normal text-[12px]">
                  {item.id}
                </span>
                <span className="col-span-2 flex text-[#282828] font-normal text-[12px] justify-end gap-x-4">
                  <button onClick={() => setEdit([true, item.id])}>
                    <img src="/edit.svg" alt="edit icon" />
                  </button>
                  <button
                    onClick={() => setProductDeleteModal([true, item.id])}
                  >
                    <img src="/trash.svg" alt="delete icon" />
                  </button>
                </span>
              </div>
            ))
          )
        ) : (
          <div className="grid myGrid14 px-10 w-full h-[70px] items-center last:rounded-b-2xl bg-[#ffffff]">
            <span className="col-span-full text-center">
              <h1>کالایی موجود نیست!</h1>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsPage;
