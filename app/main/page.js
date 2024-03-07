"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrNotification } from "react-icons/gr";
const Page = () => {
  const [click, setClick] = useState(1);
  const [com, setCom] = useState(0);
  const [store, setStore] = useState(0);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState(0);
  const [reports, setReports] = useState([]);
  const [activeusers, setActiveusers] = useState(0);
  const [activeusersdata, setActiveusersdata] = useState([]);
  const [storedata, setStoredata] = useState([]);
  const [monetization, setMonetization] = useState([]);
  const [deliverydata, setDeliverydata] = useState([]);
  const [adsdata, setAdsdata] = useState([]);
  const [usersdata, setUsersdata] = useState([]);
  const [oid, setOid] = useState("");

  const func = async () => {
    try {
      const res = await axios.get("http://localhost:7191/api/v1/getcom");
      setCom(res.data);
      // }
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    func();
  }, []);
  const funcc = async () => {
    try {
      const resp = await axios.get("http://localhost:7191/api/v1/getusers");
      const totalComToAdd = String(resp.data?.storeAddress) || 0;
      //console.log(resp.data);
      setUsers(resp.data.length);
      setData(resp.data);
      if (Array.isArray(resp.data)) {
        const sumTotalCom = resp.data.reduce(
          (acc, d) => store + (d?.storeAddress !== null ? 1 : 0),
          0
        );
        // console.log(sumTotalCom);
        setStore(sumTotalCom);
      }
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    funcc();
  }, []);
  const funccc = async () => {
    try {
      const response = await axios.get("http://localhost:7191/api/v1/getrep");
      //console.log(response.data);
      setReports(response.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    funccc();
  }, []);
  const active = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7191/api/v1/getactiveusers"
      );
      // console.log(res.data);g
      setActiveusersdata(res.data);
      setActiveusers(res.data.length);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    active();
  }, []);
  const storereq = async () => {
    try {
      const res = await axios.get("http://localhost:7191/api/v1/getstore");
      // console.log(res.data);g
      setStoredata(res.data);
      //console.log(res.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  const storereqq = async (userid, statuss) => {
    try {
      const response = await axios.post(
        "http://localhost:7191/api/v1/approvestore",
        {
          userid: userid,
          statuss: statuss,
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    storereq();
  }, []);
  const mon = async () => {
    try {
      const res = await axios.get("http://localhost:7191/api/v1/getmonetize");
      setMonetization(res.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    mon();
  }, []);
  const delivery = async () => {
    try {
      const res = await axios.get("http://localhost:7191/api/v1/getdeliveries");
      //console.log(res.data);
      setDeliverydata(res.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    delivery();
  }, []);
  const Ad = async () => {
    try {
      const res = await axios.get("http://localhost:7191/api/v1/getads");
      //console.log(res.data);
      setAdsdata(res.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    Ad();
  }, []);
  const appad = async (id, status) => {
    try {
      const response = await axios.post(
        "http://localhost:7191/api/v1/approvead",
        {
          id: id,
          status: status,
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  const getorder = async (oid) => {
    try {
      const response = await axios.post(
        `http://localhost:7191/api/v1/getorderpdf/${oid}`
      );

      //const data = await response.data();
      console.log(response.data);
      // if (response.data.success) {
      //   console.log(response.data.pdflink);
      //   const link = document.createElement("a");
      //   link.href = response.data.pdflink;
      //   link.download = "order.pdf";
      //   document.body.appendChild(link); // Append the link to the document body
      //   link.click();
      //   document.body.removeChild(link);
      // } else {
      //   console.error(
      //     "Error fetching PDF link:",
      //     data.message || "Unknown error"
      //   );
      // }
    } catch (e) {
      console.log("error in fetching");
    }
  };
  const lastuser = async () => {
    try {
      const res = await axios.get("http://localhost:7191/api/v1/getlatestuser");
      console.log(res.data);
      //setUsersdata(res.data);
    } catch (e) {
      console.log("error in fetching");
    }
  };
  useEffect(() => {
    lastuser();
    console.log(usersdata);
  }, []);
  return (
    <div className="w-screen h-screen bg-[#f1f1f1] flex flex-col pn:max-sm:overflow-auto">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Sofia"
      />
      <div
        style={{ fontFamily: "Sofia" }}
        className="h-[70px] w-[100%] text-[22px] pn:max-sm:fixed pn:max-sm:top-0 bg-white font-semibold pl-2 flex items-center text-black"
      >
        Super Admin Panel
      </div>

      {/* Counts */}
      <div className="flex flex-row h-[30%]  pn:max-sm:grid pn:max-sm:grid-cols-2 w-[100%] justify-evenly items-center overflow-auto">
        <div className="h-[80%] w-[24%] pn:max-sm:w-[80%] border-[#66B2EC] bg-[#F1F8FD] rounded-2xl border-2 flex flex-col justify-evenly p-2">
          <div className="text-[18px] text-black font-semibold">
            Total users
          </div>
          <div className="text-[#379AE6] text-[20px] font-bold">{users}</div>
          <div className="text-black">+8 from yesterday</div>
        </div>
        <div className="h-[80%] w-[24%] pn:max-sm:w-[80%] border-[#F2C263] bg-[#FEF9EE] rounded-2xl border-2  flex flex-col justify-evenly p-2">
          <div className="text-[18px] text-black font-semibold">
            Total communities
          </div>
          <div className="text-[#EFB034] text-[20px] font-bold">{com}</div>
          <div className="text-black">+8 from yesterday</div>
        </div>
        <div className="h-[80%] w-[24%] pn:max-sm:w-[80%] border-[#4CE77F] bg-[#EEFDF3] rounded-2xl border-2  flex flex-col justify-evenly p-2">
          <div className="text-[18px] text-black font-semibold">
            Total stores
          </div>
          <div className="text-[#1DD75B] text-[20px] font-bold">{store}</div>
          <div className="text-black">+8 from yesterday</div>
        </div>

        <div className="h-[80%] w-[24%] pn:max-sm:w-[80%] border-[#15ABFF] bg-[#E8EEF2] rounded-2xl border-2  flex flex-col justify-evenly p-2">
          <div className="text-[18px] text-black font-semibold">
            Active users
          </div>

          <div className="text-[#379AE6] text-[20px] font-bold">
            {activeusersdata[activeusers - 1]?.activeuser}
          </div>
          <div className="text-black">
            Last date: {activeusersdata[activeusers - 1]?.date}
          </div>
        </div>
      </div>
      <div className="flex w-[100%] pn:max-sm:flex-col px-2 justify-between">
        <div className="flex flex-col w-[69.5%] rounded-2xl p-1 bg-slate-100">
          <div className="flex flex-col text-[#424242] ">
            <div className="text-[18px] gap-2 font-semibold ml-2 w-[100%] flex items-center">
              <GrNotification />
              <div> Notify</div>
            </div>
            <div className="flex flex-row w-[75%] justify-between ml-2 items-center h-[50px] text-black">
              <div
                onClick={() => {
                  setClick(1);
                }}
                className="hover:border-[#6D31ED] hover:border-b-4"
              >
                Store request
              </div>
              <div
                onClick={() => {
                  setClick(2);
                }}
                className="hover:border-[#6D31ED] hover:border-b-4"
              >
                Reports
              </div>
              <div
                onClick={() => {
                  setClick(3);
                }}
                className="hover:border-[#6D31ED] hover:border-b-4"
              >
                Monetize requests
              </div>
              <div
                onClick={() => {
                  setClick(4);
                }}
                className="hover:border-[#6D31ED] hover:border-b-4"
              >
                Ads requests
              </div>
              <div
                onClick={() => {
                  setClick(5);
                }}
                className="hover:border-[#6D31ED] hover:border-b-4"
              >
                Generate order bills
              </div>
              <div
                onClick={() => {
                  setClick(6);
                }}
                className="hover:border-[#6D31ED] hover:border-b-4"
              >
                Last 5 downloads
              </div>
            </div>
          </div>
          <div className="h-[300px] border-2 rounded-xl text-green-500  font-bold text-[16px]">
            {click === 1 ? (
              <div className="flex flex-col  h-[100%] overflow-auto">
                {storedata.map((d, i) =>
                  d?.status === "pending" ? (
                    <div
                      key={i}
                      className="border-b-2 flex flex-col text-[14px]"
                    >
                      <div>User Id: {d?.userid}</div>
                      <div>Type: {d?.type}</div>
                      <div>Status: {d?.status}</div>

                      <div className="flex flex-row justify-end">
                        <div
                          onClick={() => {
                            storereqq(d?.userid, "approved");
                          }}
                          className="text-green-400 text-[14px] m-2"
                        >
                          Approve
                        </div>
                        <div
                          onClick={() => {
                            storereqq(d?.userid, "rejected");
                          }}
                          className="text-red-400 text-[14px] m-2"
                        >
                          Reject
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center text-[30px] text-red-700 h-[100%]">
                      No recent data
                    </div>
                  )
                )}
              </div>
            ) : null}
            {click === 2 ? (
              <div className="flex flex-col h-[100%] overflow-auto">
                {reports.map((d, i) => (
                  <div key={i} className="border-b-2 flex flex-col">
                    <div>Reported Id: {d?.reportedid?.id}</div>
                    <div>
                      {(() => {
                        const descArray = d?.desc || [];
                        const indicesToPrint = [];
                        <div>{descArray[0]}</div>;
                        for (let index = 0; index < descArray.length; index++) {
                          // Add condition based on your requirements
                          console.log(index);
                          indicesToPrint.push(index);
                        }

                        return indicesToPrint.map((index) => (
                          <div key={index} className="text-red-600 text-[14px]">
                            {index + 1} : {descArray[index]}
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {click === 3 ? (
              <div className="flex flex-col  h-[100%] overflow-auto">
                {monetization.map((d, i) => (
                  <div key={i} className="border-b-2 flex flex-col text-[14px]">
                    <div>Creator Id: {d?.creator}</div>
                    <div>Community Id: {d?.community}</div>
                    <div>Status: {d?.status}</div>
                  </div>
                ))}
              </div>
            ) : null}
            {click === 4 ? (
              <div className="flex flex-col h-[100%] overflow-auto text-black">
                {adsdata.map((d, i) =>
                  d?.status === "pending" ? (
                    <div
                      key={i}
                      className="border-b-2 flex flex-col text-[14px]"
                    >
                      <div> Id: {d?.id}</div>
                      <div>Status: {d?.status}</div>

                      <div className="flex flex-row justify-end">
                        <div
                          onClick={() => {
                            appad(d?.id, "Approved");
                          }}
                          className="text-green-400 text-[14px] m-2"
                        >
                          Approve
                        </div>
                        <div
                          onClick={() => {
                            storereqq(d?.id, "Rejected");
                          }}
                          className="text-red-400 text-[14px] m-2"
                        >
                          Reject
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ) : null}
            {click === 5 ? (
              <div className="flex flex-col h-[100%] overflow-auto text-black">
                <input
                  placeholder="Enter order id"
                  value={oid}
                  onChange={(e) => {
                    setOid(e.target.value);
                  }}
                />
                <div
                  onClick={() => {
                    getorder(oid);
                  }}
                  className="text-green"
                >
                  Generate bill
                </div>
              </div>
            ) : null}
            {click === 6 ? (
              <div className="flex flex-col border-2 h-[100%] overflow-auto text-black">
                <div>Name: {usersdata[0].fullname}</div>
                <div>Email: {usersdata[0]?.email}</div>
                <div>Phone: {usersdata[0]?.phone}</div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="bg-slate-100 p-1 rounded-2xl w-[30%] text-[#424242]">
          <div className="text-[18px] font-semibold ml-2 flex items-center justify-center">
            Deliveries arrived
          </div>
          <div className="h-[300px] flex flex-col  items-center">
            <div className="flex flex-col text-black font-bold w-[90%]">
              {deliverydata.map((d, i) => (
                <div key={i}>
                  {d?.status === "Not started" ? (
                    <div className="flex flex-col border-2">
                      <div>Id: {d?._id}</div>
                      <div>
                        From: {d?.pickupaddress?.streetaddress}{" "}
                        {d?.pickupaddress?.city} {d?.pickupaddress?.state}{" "}
                        {d?.pickupaddress?.pincode}
                      </div>
                      <div>
                        To: {d?.droppingaddress?.streetaddress}{" "}
                        {d?.droppingaddress?.city} {d?.droppingaddress?.state}{" "}
                        {d?.droppingaddress?.pincode}
                      </div>
                      <div>Contact: {d?.phonenumber}</div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
