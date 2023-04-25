import React from 'react';
import hrVideo from '../assets/video/hr.mp4';
import omVideo from '../assets/video/om.mp4';
import swVideo from '../assets/video/sw.mp4';
import pmoVideo from '../assets/video/pmo.mp4';
import backVideo from '../assets/video/back.mp4';
import testVideo from '../assets/video/test.mp4';
import analystVideo from '../assets/video/analyst.mp4';
import { DialogLine } from '../components/Speech';
import { Line, Speech } from '../components';
import { Column, Wrapper } from '../styled/dialogs';
import { TextContent } from '../styled/dialogs';
import { StaticContent } from '../components/Modal/StaticContent';
import { Button } from '../styled/common';

export interface Modal {
  id: string;
  title: JSX.Element;
  children: JSX.Element;
  customFooter?: React.ReactElement;
}

export const LOCKED_MODALS = new Set<string>();

export const MODALS_CONFIG: Modal[] = [
  {
    id: 'hr',
    title: (
      <Line time={1} delay={0.25}>
        Привет!
      </Line>
    ),
    children: (
      <Wrapper>
        <Column>
          <video src={hrVideo} autoPlay></video>
        </Column>
        <Column>
          <Speech delay={1.5}>
            {[
              'HR-специалист — первый человек, которого ты встретишь',
              'при знакомстве со своим новым местом работы.',
              'Коллеги из HR помогут тебе с адаптацией, а ещё подробно расскажут о твоей роли',
              'в компании и о том, как всё устроено!',
            ]}
          </Speech>
        </Column>
      </Wrapper>
    ),
  },
  {
    id: 'om',
    title: (
      <Line time={1} delay={0.25}>
        Привет!
      </Line>
    ),
    children: (
      <Wrapper>
        <Column>
          <video src={omVideo} autoPlay></video>
        </Column>
        <Column>
          <Speech delay={1.5}>
            {[
              'Офис-менеджер - это второй человек,',
              'которого ты встретишь в ходе своего трудоустройства:',
              'он обеспечивает офис всем необходимым,',
              'помогает коллегам с входящей и исходящей корреспонденцией,',
              'и готовит пропуска для всех сотрудников.',
              'Именно он и вручит тебе твой пропуск в компанию.',
            ]}
          </Speech>
        </Column>
      </Wrapper>
    ),
  },
  {
    id: 'sw',
    title: (
      <Line time={1} delay={0.25}>
        Привет!
      </Line>
    ),
    children: (
      <Wrapper>
        <Column>
          <video src={swVideo} autoPlay></video>
        </Column>
        <Column>
          <Speech delay={1.5}>
            {[
              'Коллеги из команды тех.поддержки предоставляют оборудование сотрудникам,',
              'занимаются созданием корпоративной учетной записи,',
              'а также предоставляют доступы к необходимым корпоративным сервисам.',
            ]}
          </Speech>
        </Column>
      </Wrapper>
    ),
  },
  {
    id: 'pmo',
    title: (
      <Line time={1} delay={0.25}>
        Привет!
      </Line>
    ),
    children: (
      <Wrapper>
        <Column>
          <video src={pmoVideo} autoPlay></video>
        </Column>
        <Column>
          <Speech delay={1.5}>
            {[
              'PMO специалист - это помошник менеджера проекта.',
              'Его основная задача - администрирование и координация задач внутри команды,',
              'а также контроль сроков их выполнения',
            ]}
          </Speech>
        </Column>
      </Wrapper>
    ),
  },
  {
    id: 'back',
    title: (
      <Line time={1} delay={0.25}>
        Привет!
      </Line>
    ),
    children: (
      <Wrapper>
        <Column>
          <video src={backVideo} autoPlay></video>
        </Column>
        <Column>
          <Speech delay={1.5}>
            {[
              'Backend разработчик -  пишет код, ',
              'проверяет его на качество и участвует в ',
              'дальнейшем сопровождении, если это необходимо ',
            ]}
          </Speech>
        </Column>
      </Wrapper>
    ),
  },
  {
    id: 'test',
    title: (
      <Line time={1} delay={0.25}>
        Привет!
      </Line>
    ),
    children: (
      <Wrapper>
        <Column>
          <video src={testVideo} autoPlay></video>
        </Column>
        <Column>
          <Speech delay={1.5}>
            {[
              'Тестер: коллеги из практики тестирования ',
              'проверяют качество разрабатываемого продукта, ',
              'а также осуществляют поиск, анализ и регистрацию дефектов',
            ]}
          </Speech>
        </Column>
      </Wrapper>
    ),
  },
  {
    id: 'analyst',
    title: (
      <Line time={1} delay={0.25}>
        Привет!
      </Line>
    ),
    children: (
      <Wrapper>
        <Column>
          <video src={analystVideo} autoPlay></video>
        </Column>
        <Column>
          <Speech delay={1.5}>
            {[
              'Бизнес аналитик - связующее звено между заказчиком и командой разработки:',
              'Он собирает пожелания заказчика, оформляет по ним технические требования.',
              'Требования берет в работу команда разработки, а также по ним',
              'проводится тестирование программного продукта.',
              'Также аналитик контролирует процесс разработки, и проводит',
              'демонстрации реализованного функционала клиентам :)',
            ]}
          </Speech>
        </Column>
      </Wrapper>
    ),
  },
];

export const GAME_FINISHED_MODAL: Modal = {
  id: 'finish',
  title: (
    <Line time={1} delay={0.25}>
      Поздравляем! Ты прошёл игру!
    </Line>
  ),
  children: (
    <Wrapper>
      <Column>
        <StaticContent>
          {[
            'Ты молодец!',
            'В процессе игры ты познакомился с коллегами:',
            '• Backend разработчиком Машей',
            '• HR специалистом Сашей',
            '• PMO специалистом Машей',
            '• Системным аналитиком Надей',
            '• Специалистом техподдержки Стасом',
            '• Специалистом по тестированию Денисом',
            '• Офис-менеджером Настей',
          ]}
        </StaticContent>
        {/*
        TODO: понять, стоит ли использовать, так как в финальной модалке раздражает.
        <Speech delay={0}>{[
          '• Backend разработчиком Машей',
          '• HR специалистом Сашей',
          '• PMO специалистом Машей',
          '• Системным аналитиком Надей',
          '• Специалистом техподдержки Стасом',
          '• Специалистом по тестированию Денисом',
          '• Офис-менеджером Настей',
        ]}</Speech>*/}
      </Column>
    </Wrapper>
  ),
  customFooter: <></>,
  /*
  TODO: вернуть как появится ссылка.
  customFooter: (
    <Button
      onClick={() => {
        window.open('https://www.google.com/intl/ru/forms/about/', '_blank');
      }}
    >
      Пройти опрос
    </Button>
  ),*/
};
