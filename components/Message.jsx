const Message = ({ username, avatar, description, children }) => {
  console.log(description);
  return (
    <div className="bg-white p-6 my-4 border-b-2 rounded-lg font-light">
      <div className=" flex items-center gap-2">
        <img src={avatar} alt="user" className="w-10 rounded-full" />
        <h2>{username}</h2>
      </div>
      <div className="my-4">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Message;
