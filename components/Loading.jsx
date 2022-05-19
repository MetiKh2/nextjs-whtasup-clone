import Image from 'next/image'
import loading from '../public/d7gwtxy-a0648d53-d900-425d-85e4-96fdeb5e7968.gif'
const Loading = () => {
  return (
    <center style={{display:'grid',placeItems:'center',height:'100vh'}}>
        <div style={{display:'flex',flexDirection:'column'}}>
            <Image
            height={120}
            width={200}
            src={'https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo-700x394.png'}
            />   
            <Image
            src={loading}
            layout='responsive'
/>            
        </div>
    </center>
  )
}

export default Loading