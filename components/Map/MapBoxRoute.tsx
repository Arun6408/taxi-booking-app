import { DirectionDataContext } from '@/context/Context'
import React, { useContext } from 'react'
import { Layer, Source } from 'react-map-gl'

const MapBoxRoute = () => {
    const {directionCoordinates} = useContext(DirectionDataContext);
  return (
    <div>
        <Source type='geojson' data={{ type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates: directionCoordinates } }] }}>
            <Layer type='line' paint={{ 'line-color': '#0088ff', 'line-width': 4 }} />
        </Source>
    </div>
  )
}

export default MapBoxRoute