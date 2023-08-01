import GoogleMapReact from "google-map-react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


const Marker = ({text})=>{
  const element = <FontAwesomeIcon icon={faCoffee} />
  return (
    <div>
      {
        <div>{element}{text}</div>
      }
    </div>
    )
}

function Googlemap(){
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 25.0330, lng: 121.5654 })
  useEffect(()=>{
  
    // 使用 Geolocation API 取得目前位置
    if(navigator.geolocation){ 
      navigator.geolocation.getCurrentPosition(
        (position) => {
            const {latitude, longitude} = position.coords;
            setCurrentLocation({lat: latitude, lng: longitude})
            setMapCenter({lat: latitude, lng: longitude})
            console.log('currentLocation', currentLocation, 'mapCenter', mapCenter)
        },
        (error) => {
          console.log('取得目前位置失敗:', error.message)
        }
      )
    } else {
      console.log('瀏覽器不支援 Geolocation API')
    }
  }, [])


  const reactkey = import.meta.env.VITE_APP_KEY;

  return (
    <div style={{ height: 'calc(100vh - 58px)', width: '96vw' }}>
      {currentLocation? (
      <GoogleMapReact
        bootstrapURLKeys={{key: reactkey}}
        defaultCenter={mapCenter}
        defaultZoom={14}
        onChange={(event)=>{
          console.log('currentLocation', currentLocation, 'mapCenter', mapCenter);

        }} // 監聽中心點位置
      >
        {/* 在地圖上標記目前位置 */}
        
          <Marker
          text="目前位置"
          lat={currentLocation.lat}
          lng={currentLocation.lng}
          />


      </GoogleMapReact>

      ):(
        <div>等待取得目前位置...</div>
      )
    }
    </div>
  )
}

export default Googlemap