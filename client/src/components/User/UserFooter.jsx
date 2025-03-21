
const UserFooter = () => {
  const year = new Date().getFullYear()
  return (
    <div className=' absolute bottom-0 w-full p-1 h-[5vh] min-h-[30px] overflow-hidden'>
      <p>Copyrigh &copy; {year} </p>
    </div>
  )
}

export default UserFooter
