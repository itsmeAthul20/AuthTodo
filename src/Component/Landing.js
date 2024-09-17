import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url(https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
  },
  h1: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    width: '65%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
  },
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#c82333',
  },
  logoutButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff5c5c',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButtonHover: {
    backgroundColor: '#ff1e1e',
  },
};

function App() {
  const [item, setItem] = useState("");
  const [list, setListItem] = useState([]);
  const auth = getAuth(); 
  const navigate = useNavigate(); 

  function btnClicked() {
    if (item.trim() !== "") {
      setListItem([...list, item]);
      setItem("");
    }
  }

  function textInput(e) {
    setItem(e.target.value);
  }

  function deleteItem(index) {
    const newList = list.filter((_, i) => i !== index);
    setListItem(newList);
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate('/'); 
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  }

  return (
    <div style={styles.body}>
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.logoutButton.backgroundColor}
      >
        Logout
      </button>
      <div style={styles.container}>
        <h1 style={styles.h1}>Todo List:</h1>
        <input
          type="text"
          onChange={textInput}
          value={item}
          placeholder="Enter your Item"
          style={styles.input}
        />
        <button
          style={styles.button}
          onClick={btnClicked}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Add
        </button>
        <ul style={styles.ul}>
          {list.map((item, index) => (
            <li key={index} style={styles.li}>
              {item}
              <button
                style={styles.deleteButton}
                onClick={() => deleteItem(index)}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
