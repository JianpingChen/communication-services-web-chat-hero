﻿import { ActionButton, FontIcon, IIconProps, Stack } from '@fluentui/react';
import React, { useEffect } from 'react';
import Stream from './Stream';
import { staticAreaStyle } from './styles/ChatScreen.styles';
import { backButtonStyle, calendarIconStyle, headerTextStyle, roomMainAreaStackStyles,  timeIconStyle } from './styles/RoomMainArea.styles';

const backIcon: IIconProps = { iconName: 'Back' };

interface RoomMainAreaProps {
  roomTitle: string;
  userId: string;
  setupRoom(): void;
  setRoomThreadId(roomId: string): void;
  backToChatScreenHander(): void;
  removeChatParticipantById: (userId: string) => Promise<void>;
}

export default (props: RoomMainAreaProps): JSX.Element => {
  const { setupRoom, setRoomThreadId, backToChatScreenHander, removeChatParticipantById } = props;

  useEffect(()=>{
    setRoomThreadId("room1");
    setupRoom();
  }, []);

  const backButtonHandler = () => {
    removeChatParticipantById(props.userId);
    setRoomThreadId("main");
    setupRoom();
    backToChatScreenHander();
  }

  return (
    <div className={staticAreaStyle}>
      <ActionButton className={backButtonStyle} iconProps={backIcon} onClick={backButtonHandler}>
        Back to all rooms
      </ActionButton>
      <h1>
        {props.roomTitle}
      </ h1>
      <Stack styles={roomMainAreaStackStyles} >
        <h3 className={headerTextStyle}>
          <FontIcon aria-label="Calendar" iconName="Calendar" className={calendarIconStyle} />
          June 9th, 2021
        </h3>
        <h3 className={headerTextStyle}>
          <FontIcon aria-label="DateTime" iconName="DateTime" className={timeIconStyle} />
          08:00AM - 12:00PM PST (UTC - 8:00)
        </h3>
      </ Stack>
      <Stream />
    </div>
  );
};
