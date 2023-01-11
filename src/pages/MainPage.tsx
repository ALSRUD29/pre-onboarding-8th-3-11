import Autocomplete from '../components/Autocomplete';
import SearchIcon from '../components/SearchIcon';

const MainPage = () => {
  return (
    <div className="App">
      <div className="bg-sky-200 h-60 grid place-items-center">
        <div>
          <div className="text-4xl grid place-items-center leading-normal font-bold mb-8">
            <h2>국내 모든 임상시험 검색하고</h2>
            <h2> 온라인으로 참여하기</h2>
          </div>
          <Autocomplete />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
