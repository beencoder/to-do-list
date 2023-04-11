import React from "react";
import { Link } from 'react-router-dom';

class MainPage extends React.Component {
  state = {
    isLoading: true,
    // ports: [],
  };

  render() {
    return (
      <>
        <div>
                <h3>메인 페이지입니다.</h3> 
                <ul>
                    <Link to="/login"><li>링크 로그인 페이지</li></Link>
			    </ul>
        </div>
      </>
    );
  }
}


export default MainPage;