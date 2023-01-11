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
              />
              <button className="bg-[#1da1f2] w-20 text-white">검색</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
