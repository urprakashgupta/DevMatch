export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter Your Email"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter Your Password"
            />
          </fieldset>
          <div className="card-actions flex justify-center">
            <button className="btn btn-primary  ">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
