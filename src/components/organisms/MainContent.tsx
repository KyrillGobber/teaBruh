import { Button } from '../ui/button';
import { Card, CardHeader } from '../ui/card';
import {
    ArrowBigLeft,
    ArrowBigRight,
    ArrowLeftFromLine,
    Pause,
    Play,
} from 'lucide-react';
import { Progress } from '../ui/progress';
import { useTeaStore } from '@/lib/stores/TeaStore';
import { TeaInfo } from '../molecules/TeaInfo';
import useTimer, { TimerState } from '@/lib/hooks/useTimer';
import { useSettingsStore } from '@/lib/stores/useSettingsStore';
import { t } from 'i18next';

const getIcon = (
    timerState: TimerState,
    isLastInfusion: boolean,
    pretimerSeconds: number
) => {
    switch (timerState) {
        case 'running':
            return <Pause size={128} />;
        case 'stopped':
            if (isLastInfusion) return <ArrowLeftFromLine size={128} />;
            return <Play size={128} />;
        case 'pretimer':
            return (
                <div>
                    <p>Pour your water...</p>
                    <p className="text-3xl font-bold">{pretimerSeconds}</p>
                </div>
            );
    }
};

export const MainContent = () => {
    const tea = useTeaStore((state) => state.tea);
    const { pretimer } = useSettingsStore((state) => state);
    const {
        start,
        stop,
        nextInfusion,
        previousInfusion,
        progress,
        timerState,
        currentTime,
        currentInfusion,
        isLastInfusion,
        pretimerSeconds,
    } = useTimer(tea, pretimer);

    const handleBrewButtonEvent = () => {
        if (timerState === 'stopped') {
            start();
        } else {
            stop();
        }
    };

    return (
        <div className="flex flex-col justify-between items-center gap-24">
            <div className="flex flex-col justify-center items-center gap-8 mt-12">
                <div className="flex flex-col text-center gap-2">
                    <h1>{t(tea.name)}</h1>
                    <h2>{`Infusion: ${currentInfusion}`}{!tea.custom && `/${tea.infusions.length}`}</h2>
                </div>
                <Card>
                    <CardHeader className="flex flex-col items-center w-32">
                        <h1 className="text-5xl">{currentTime}</h1>
                        <Progress value={progress} />
                    </CardHeader>
                </Card>
                <div className="flex flex-col gap-4">
                    <Button
                        className="p-8 h-64 rounded-full border border-white"
                        variant={'ghost'}
                        onClick={handleBrewButtonEvent}
                    >
                        {getIcon(timerState, isLastInfusion, pretimerSeconds)}
                    </Button>
                    <div className="flex flex-row gap-8">
                        <Button
                            className="p-8"
                            variant={'ghost'}
                            disabled={currentInfusion === 1}
                            onClick={previousInfusion}
                        >
                            <span className="flex flex-col">
                                <ArrowBigLeft size={48} />
                                {t('general.previous')}
                            </span>
                        </Button>
                        <Button
                            className="p-8"
                            variant={'ghost'}
                            disabled={currentInfusion === tea.infusions.length && !tea.custom}
                            onClick={nextInfusion}
                        >
                            <span className="flex flex-col">
                                <ArrowBigRight size={48} />
                                {t('general.next')}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            {!tea.custom && (
                <div className="flex flex-col w-full p-4 md:p-0 md:w-1/5">
                    <TeaInfo />
                </div>
            )}
        </div>
    );
};
