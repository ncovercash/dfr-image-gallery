import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Reorder as ReorderIcon,
} from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useCallback } from "react";
import { DragDropContext, Draggable, DragUpdate, Droppable, DropResult } from "react-beautiful-dnd";
import type { Event } from "../data/useData";

export default function AdminEventSidebar({
  data,
  setData,
  curEvent,
  setCurEvent,
  setShowDialog,
}: {
  data: Event[];
  setData: (newData: Event[]) => void;
  curEvent?: Event;
  setCurEvent: (n: Event | undefined) => void;
  setShowDialog: (n: boolean | Event) => void;
}) {
  const eventDragger = useCallback(
    (result: DropResult | DragUpdate) => {
      if (
        data === undefined ||
        result.destination === undefined ||
        ("reason" in result && result?.reason === "CANCEL")
      ) {
        return;
      }
      if (
        result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index
      ) {
        return;
      }

      const newData = [...data];
      newData.splice(result.destination.index, 0, ...newData.splice(result.source.index, 1));

      setData(newData);
    },
    [data, setData],
  );

  return (
    <Grid item md={4} lg={3} height="100%" overflow="auto" borderRight="1px solid #333">
      <DragDropContext onDragEnd={eventDragger}>
        <Droppable droppableId="event-list">
          {(providedDroppable) => (
            <div {...providedDroppable.droppableProps} ref={providedDroppable.innerRef}>
              {data.map((event, i) => (
                <Draggable key={event.url} draggableId={event.url} index={i}>
                  {(provided) => (
                    <Box
                      minHeight="5rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      padding={2}
                      borderBottom="1px solid #aaa"
                      sx={{
                        cursor: "pointer",
                        backgroundColor: event.url === curEvent?.url ? "#333" : "#000",
                      }}
                      onClick={() => setCurEvent(event)}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <span
                        style={
                          event.url === curEvent?.url
                            ? {
                              fontWeight: "bold",
                            }
                            : {}
                        }
                      >
                        {event.title}
                        <br />
                        <span style={{ fontSize: "75%" }}>{event.subtitle}</span>
                      </span>

                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                                             jsx-a11y/no-static-element-interactions */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <IconButton onClick={() => setShowDialog(event)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton {...provided.dragHandleProps}>
                          <ReorderIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            if (
                              // eslint-disable-next-line no-restricted-globals, no-alert
                              !confirm(`Please confirm that you want to delete "${event.title}"`)
                            ) return;

                            const newData = [...data];
                            newData.splice(i, 1);

                            setData(newData);

                            if (event.url === curEvent?.url) {
                              setCurEvent(undefined);
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Box>
                  )}
                </Draggable>
              ))}
              {providedDroppable.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="contained"
        sx={{ margin: 2 }}
        startIcon={<AddIcon />}
        onClick={() => setShowDialog(true)}
      >
        New Event
      </Button>
    </Grid>
  );
}
