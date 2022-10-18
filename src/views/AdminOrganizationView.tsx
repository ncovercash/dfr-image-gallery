import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EventDialog from "../components/EventDialog";
import AdminEventSidebar from "../components/AdminEventSidebar";
import type { Event } from "../data/useData";
import useData from "../data/useData";
import useSetData from "../data/useSetData";
import EventEditor from "../components/EventEditor";

export default function AdminOrganizationView(props: { password: string }) {
  const _data = useData();
  const [data, setTempData] = useState<Event[] | undefined>(undefined);
  useEffect(() => setTempData(_data), [_data]);

  const setData = useSetData(props.password, setTempData);
  const [curEvent, setCurEvent] = useState<Event | undefined>(undefined);

  const [showDialog, setShowDialog] = useState<boolean | Event>(false);

  if (data === undefined) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Grid container height="calc(100vh - 8rem)">
        <AdminEventSidebar
          data={data}
          setData={setData}
          curEvent={curEvent}
          setCurEvent={setCurEvent}
          setShowDialog={setShowDialog}
        />
        <Grid item md={8} lg={9} height="100%" overflow="auto">
          {curEvent === undefined ? (
            <p style={{ margin: "1rem", fontStyle: "italic", color: "#ccc" }}>
              Please select an event
            </p>
          ) : (
            <EventEditor
              event={curEvent}
              eventList={data}
              setData={(newEvent) => {
                const newData = [...data];
                setCurEvent(newEvent);
                // copy to event based on unique URL
                // event editor does not support editing URL, so this is fine
                for (let i = 0; i < newData.length; i++) {
                  if (newData[i].url === newEvent.url) {
                    newData[i] = newEvent;
                  }
                }
                setData(newData);
              }}
              setAllData={(d) => {
                setData(d);
                for (const e of d) {
                  if (e.url === curEvent?.url) {
                    setCurEvent(e);
                    return;
                  }
                }
              }}
            />
          )}
        </Grid>
      </Grid>
      <EventDialog
        data={data}
        setData={setData}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
