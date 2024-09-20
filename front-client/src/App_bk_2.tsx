import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import { BakeryGetApi } from './types/TypeBakeryGetApi'
import BakeryRow from './bakery/bakeryList/BakeryRow'
import { BakeryDescription } from './types/TypeBakeryDescription'
import { BakeryData } from './types/TypeBakeryData';
import { Form } from './types/TypeForm';
import BakerySearchDialog from './bakery/bakeryList/BakerySearchDialog'
import { addMonths, addDays } from 'date-fns'
import ReactModal from 'react-modal';
import dummyBakeries from './data/dummyBakeries'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import Map from './map/Map'


ReactModal.setAppElement("#root");

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  content: {
    top: "50%", 
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
    backgroundColor: "#293652",
  }
};

const LS_KEY = "localStoarge-key"

const App = () => {
  const [form, setForm] = useState<Form>();

  //const [bakeries, setBakaries] = useState(dummyBakeries);
  const [bakeriesApi, setBakariesApi] = useState([] as BakeryGetApi[]);
  const [bakeries, setBakaries] = useState([] as BakeryData[]);
  // const [bakeries, setBakaries] = useState([] as BakeryToGo[]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sinceStr = "2021-03-01";
  const untilStr = "2021-03-07";
  const [since, setSince] = useState(sinceStr);
  const [until, setUntil] = useState(untilStr);
  const sinceDate = new Date(since) //.getDate(); 
  const untilDate = until ? new Date(until) : undefined;
  const maxUntil = (addDays(addMonths(sinceDate.getMonth(), 1), -1)).toString()

  useEffect(() => {
    const storedBakeries = localStorage.getItem(LS_KEY);
    if(storedBakeries) {
      // storedBakeries（文字列）をJSONオブジェクトにしてsetBakaries
      setBakaries(JSON.parse(storedBakeries));
    }
    // 最初のレンダリング時のみ読み込めばいいので、第二引数は空配列にする
  }, [])
  useEffect(() => {
    // localStorageにbakeriesを文字列に変換して保存
    localStorage.setItem(LS_KEY, JSON.stringify(bakeries))
  }, [bakeries]);

  const usrMemoChangeHandler = (id: string, user_memo: string) => {
    const newBakeries = bakeries.map((b) => {
      return b.id === id
        ? // true -> bを展開し、user_memoの値を引数のuser_memoで上書き
          { ...b, user_memo: user_memo }
        : // false -> 何もしない
          b
    })
    setBakaries(newBakeries)
  }

  const deleteBakeryHandler = (id: string) => {
    // 削除したいパン屋id以外のidを持つパン屋リストを新しく作成
    // Decide if delete or not by its shop.id.
    const newBakeries = bakeries.filter((b) => b.id !== id)
    setBakaries(newBakeries)
  }

  const bakeryAddHandler = (bakery: BakeryGetApi) => {
    // 乱数作成：アルファベット1文字 ＋ 数値9個
    //const alphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //const alph = alphs[Math.floor(Math.random() * alphs.length)];
    //const nums = Math.floor(Date.now()/10000);

    //const newBakery = { ...bakery, id: alph + nums };
    //setBakariesApi(newBakeries);

    const newBakery = { ...bakery, user_memo: '' };
    
    const newBakeries = [...bakeries, newBakery]; // 重複なければ要素を追加
    setBakaries(newBakeries);
  };

  const addClickHandler = () => {
    setModalIsOpen(true);
  };
  const modalCloseHandler = () => {
    setModalIsOpen(false);
  };

  const bakeryRows = bakeries.map((b) => {
    return (
      <BakeryRow
        bakery={b}
        key={b.id}
        onUsrMemoChange={(id, user_memo) => {
          usrMemoChangeHandler(id, user_memo)
        }}
        onDelete={(id) => {
          deleteBakeryHandler(id)
        }}
      />
    )
  })

  const onChangeSince = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSince(e.target.value);
    // sinceの変更日数を取得
    const newSinceDate = new Date(e.target.value);
    const diff = newSinceDate.getTime() - sinceDate.getTime();
    if (untilDate) {
      let newUntilDate = addDays(untilDate, diff/(24 * 60 * 60 * 1000));
      const newMaxUntilDate = addDays(addMonths(newSinceDate.getMonth(), 1), -1);

      if(newUntilDate > newMaxUntilDate) {
        newUntilDate = newMaxUntilDate;
      }
      setUntil(String(newUntilDate));
    }
  };
  const onChangeUntil = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUntil(e.target.value);
  };

  // const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   const updateForm: Form = {"bakeriesList": bakeries, "name": "Hana"};
  //   setForm(updateForm);
  // }
  const navigate = useNavigate(); 
  const handleSubmit = () => {
    // const updateForm: Form = {"bakeriesList": bakeries, "name": "Hana"};
    // setForm(updateForm);

    // navigate("/map", { state: { key: updateForm }});
    navigate("/map", { state: { bakeries: bakeries }});
  }

  return (  
    <div className="App">
      <section className="nav">
        <h1>
          <span>🥐</span> Bakery List <span>🥐</span>
        </h1>
        <div className="button-like" onClick={addClickHandler}>
          Add more bakeries
        </div>
      </section>
      <div>
        <input type="date" id="start" name="trip-start"
        value={since} onChange={onChangeSince} />
        ~
        <input type="date" id="start" name="trip-start"
        value={until} min={since} max={maxUntil} onChange={onChangeUntil} />
      </div>
      <div>★{since}★{until}★{maxUntil}</div>
      <section className="main">{bakeryRows}</section>
      <button onClick={() => handleSubmit()}>next page</button>
      {/* <Link to="/map">to Map</Link> */}
      <Routes>
        <Route path="/map" element={<Map />} />
      </Routes>
      <ReactModal isOpen={modalIsOpen} onRequestClose={modalCloseHandler} style={customModalStyles}>
        <BakerySearchDialog maxResults={20} onBakeryAdd={(b) => bakeryAddHandler(b)} />
      </ReactModal>
    </div>
  )
}

export default App
