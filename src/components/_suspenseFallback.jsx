

const SuspenseFallback = () => {

  const style = {
    padding: 24,
    color: "#f00",
    fontSize: 24
  };

  return (
    <div className="suspense-fallback" style={style}>
      Block is Loading
    </div>
  )
};

export default SuspenseFallback;