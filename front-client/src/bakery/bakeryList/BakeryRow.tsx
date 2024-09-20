import { BakeryData } from '../../types/TypeBakeryData'

type BakeryRowPropsType = {
  bakery: BakeryData
  onUsrMemoChange: (id: string, user_memo: string) => void
  onDelete: (id: string) => void
}

const BakeryRow = (props: BakeryRowPropsType) => {
  // name, station, user_memo にはprops.bakeryに含まれる同名変数の値を代入する
  const { id, name, station, user_memo } = props.bakery

  // 引数：htmlの変更された要素＝value  props.idとeのtarget.valueをpropsの関数に渡す
  const handleUsrMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUsrMemoChange(id, e.target.value)
  }
  // propsのonDelete関数にprops.idを渡す
  const handleDeleteClick = () => {
    props.onDelete(id)
  }

  return (
    <div className="bakery-row">
      <div title={name} className="name">
        {name}
      </div>
      <div title={station} className="station">
        {station}
      </div>
      <input
        type="text"
        className="user_memo"
        value={user_memo}
        onChange={handleUsrMemoChange}
      />
      <div className="delete-row">
        <button value="delete" onClick={handleDeleteClick}>
          delete
        </button>
      </div>
    </div>
  )
}

export default BakeryRow
