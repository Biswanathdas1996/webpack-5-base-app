import React from "react";
import { _fetch_with_wallet, _transction_with_wallet } from "../web3/connect";

function BlockChain() {
  const [data, setData] = React.useState(null);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  React.useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchInfo() {
    try {
      const getAllTokenInfo = await _fetch_with_wallet("tokenURI", 3);
      setData(getAllTokenInfo);
    } catch (err) {
      console.error("Unable to fetch data from IPFS", err);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log(formData);
    const transctionDatat = await _transction_with_wallet(
      "addData",
      3,
      JSON.stringify(formData)
    );
    console.log("--transctionDatat->", transctionDatat);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>BlockChain </h2>
      <code>{data}</code>
      <div style={{ margin: 30 }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BlockChain;
