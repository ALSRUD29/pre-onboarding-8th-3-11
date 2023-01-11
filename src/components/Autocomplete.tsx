import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchIcon from './SearchIcon';

// FIXME : 인풋창 밖에 클릭했을 때 추천검색어 없어지기
// FIXME : 검색결과 볼드처리

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [sickNms, setSickNms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [clickedState, setClickedState] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(
        `http://localhost:4000/sick?q=${encodeURIComponent('담낭')}`
      );
      setSickNms(response.data);
    };
    loadData();
  }, [setSickNms]);
  //console.log('sickNms', sickNms);

  const handleInputChange = event => {
    const { value } = event.target;
    setInputValue(value);

    let matches = []; //const로 선언하면 안됨
    if (value.length > 0) {
      matches = sickNms.filter(item => {
        const regex = new RegExp(`${value}`, 'i');
        return item.sickNm.match(regex);
      });
    }
    matches.length > 0 ? setClickedState(false) : setClickedState(true);

    setSuggestions(matches);
  };
  //console.log('suggestions', suggestions);

  const handleInputClick = () => {
    if (inputValue === '') {
      setClickedState(true);
    }
  };

  const handleSuggestion = select => {
    setInputValue(select);
    setSuggestions([]);
  };

  const handleKeyUp = event => {
    if (inputValue.length > 0) {
      if (event.code === 'ArrowDown' && sickNms.length - 1 > selected) {
        setSelected(selected + 1);
      }
      if (event.code === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      if (event.code === 'Enter' && selected >= 0) {
        // console.log('selected', selected);
        // console.log('suggestions', suggestions[selected].sickNm);
        handleSuggestion(suggestions[selected].sickNm);
        setSelected(-1);
      }
    }
  };

  return (
    <div onKeyUp={handleKeyUp}>
      <div className="grid place-items-center ">
        <div className=" box-border flex rounded-3xl overflow-hidden ">
          <div className="bg-white">
            <div className="mt-3 ml-4 ">
              <SearchIcon />
            </div>
          </div>
          <input
            className="w-80 h-12 placeholder:text-slate-400 block pl-3 outline-transparent	"
            placeholder="질환명을 입력해 주세요"
            type={'text'}
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
          <button className="bg-[#1da1f2] w-20 text-white">검색</button>
        </div>
      </div>
      {/* FIXME : 마우스가 인풋에서 떼지면 추천검색어 영역이 사라져야 함 */}
      <div className={suggestions.length > 0 ? 'bg-white mt-1 rounded-2xl py-4' : ''}>
        {suggestions.length === 0 && clickedState ? (
          <div className="bg-white mt-1 rounded-2xl flex cursor-pointer p-1 pl-5">
            추천검색어 없음
          </div>
        ) : (
          suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              onClick={() => {
                handleSuggestion(suggestion.sickNm);
              }}
              className={
                selected === idx
                  ? 'flex bg-yellow-200 mx-5 cursor-pointer p-1'
                  : 'flex mx-5 hover:bg-pink-200 cursor-pointer p-1'
              }
            >
              {suggestion.sickNm}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
