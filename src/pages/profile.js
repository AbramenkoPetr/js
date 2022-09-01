import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/counter";
import { toggleVisibleProfile } from "../store/profile";

export const ProfilePage = () => {
  const data = useSelector((state) => state.counter.count);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div>
      profile page
      <div style={{display: "none"}}>
        <h1>Counter</h1>
        <h1>{data}</h1>

        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <hr />
      </div>
      <div>
        {profile.isVisibleProfile && (
          <>
            <h3>firstName: {profile.firstName}</h3>
            <h3>lastName: {profile.lastName}</h3>
            <h3>phone: {profile.phone}</h3>
          </>
        )}
        показать<input type = "checkbox" onChange = {() => dispatch(toggleVisibleProfile())}></input>
        
        <hr />
        <h1>Profile form</h1>
        

        
        <hr />
      </div>
    </div>
  );
};//<button onClick={() => dispatch(toggleVisibleProfile())}>toggle</button>
