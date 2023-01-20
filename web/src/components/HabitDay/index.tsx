import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { ProgressBar } from './components/ProgressBar';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';


interface HabitsProps {
  completed?: number
  amount?: number
  date: Date
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitsProps) {

  const progressPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h10 border-2  rounded-lg hover:opacity-70 transition-opacity', {
          ' bg-zinc-900 border-zinc-800': progressPercentage === 0,
          'bg-violet-900 border-violet-800': progressPercentage > 0 && progressPercentage < 20,
          'bg-violet-800 border-violet-700': progressPercentage >= 20 && progressPercentage < 40,
          'bg-violet-700 border-violet-600': progressPercentage >= 40 && progressPercentage < 60,
          'bg-violet-600 border-violet-500': progressPercentage >= 60 && progressPercentage < 80,
          'bg-violet-500 border-violet-400': progressPercentage >= 80,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400 capitalize">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl ">{dayAndMonth}</span>
          <ProgressBar progress={progressPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator >
                  <Check
                    size={20}
                    className="text-white "
                    weight='bold'
                  />
                </Checkbox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 3L de refrigerante
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}