import React, { forwardRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./features/mapStyle";
import { mapConfig } from "./features/mapConfig";
import HomeMarker from "../markers/home/Home";
import WorkerMarker from "../markers/worker/WorkerMarker";
import PostulantMarker from "../markers/postulant/PostulantMarker";

const MapComponent = forwardRef(
  ({ region, user, workers, workerType, children, ...props }, ref) => {
    return (
      <MapView
        ref={ref}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        mapType="standard"
        {...mapConfig}
        {...props}
      >
        {children}

        {user?.map((user, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={false}
          >
            {user.type === "home" ? <HomeMarker /> : null}
          </Marker>
        ))}

        {workers?.map((worker, index) => (
          <Marker
            key={`worker-${index}`}
            coordinate={{ latitude: worker.lat, longitude: worker.lng }}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={false}
            onPress={() => props.onSelectWorker(worker.uid)}
          >
            {workerType === "postulant" ? (
              <PostulantMarker postulant={worker} />
            ) : (
              <WorkerMarker worker={worker} />
            )}
          </Marker>
        ))}
      </MapView>
    );
  }
);

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapComponent;
