import { Dropdown, Tabs, Tab, TriggerWrapper, Trigger } from '@/components/lukacho/dropdown';
import ThemeSwitch from './ThemeSwitch';
import { Link } from 'react-router';


const Header = () => {
    return (
        <header className="w-full flex items-center justify-between gap-2 py-3 px-3 z-50">
        <Link to="/" className="font-[500]">Work Space</Link>
        <div className="flex justify-start items-center  text-neutral-200 md:justify-center gap-3">
        <Link className='px-3' to={"../pricing"}>Pricing</Link>
        <Link className='px-3' to={"../portfolio"}>Portfolio</Link>
        <Dropdown>
            <TriggerWrapper>
            <Trigger>Components</Trigger>
            <Trigger>Blog</Trigger>
            </TriggerWrapper>
            <Tabs>
        
            <Tab>
                <Components />
            </Tab>
            <Tab>
                <Blog />
            </Tab>
            </Tabs>
        </Dropdown>
        <ThemeSwitch/>
    </div>
      </header>
     
)}

export default Header

const OurServices = () => (
    <div className="flex gap-4 p-4 w-full h-full">
      <div
        className={
          'text-white font-bold text-3xl flex items-end justify-start p-4 w-56 h-[200px] rounded-md bg-gradient-to-br [background-size:150%] from-orange-400 via-fuchsia-600 to-cyan-400'
        }
      >
        We <br /> Create
      </div>
      <div className={'flex flex-col gap-3'}>
        <div>
          <h3 className={'dark:text-white text-neutral-950'}>Websites</h3>
          <p className={'text-neutral-500 text-sm'}>
            Interactive, beautiful and user friendly websites
          </p>
        </div>
        <div>
          <h3 className={'dark:text-white text-neutral-950'}>Components</h3>
          <p className={'text-neutral-500 text-sm'}>Animated and colorful components</p>
        </div>
        <div>
          <h3 className={'dark:text-white text-neutral-950'}>SaaS</h3>
          <p className={'text-neutral-500 text-sm'}>
            Useful Software as a Service products which people love
          </p>
        </div>
      </div>
    </div>
  )
  
  const Components = () => (
    <div className="grid grid-cols-2 gap-4 p-4 ">
      <span
        className={'hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors'}
      >
        <h3 className={'dark:text-white text-neutral-950'}>Animated Charts</h3>
        <p className={'text-neutral-500 text-sm'}>Perfect for websites associated with finance</p>
      </span>
      <span
        className={'hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors'}
      >
        <h3 className={'dark:text-white text-neutral-950'}>Animated Cursor</h3>
        <p className={'text-neutral-500 text-sm'}>Useful for team work illustrations</p>
      </span>
      <span
        className={'hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors'}
      >
        <h3 className={'dark:text-white text-neutral-950'}>Tab List</h3>
        <p className={'text-neutral-500 text-sm'}>
          Animated Tab List Menu tailwindCSS and React.js Only
        </p>
      </span>
      <span
        className={'hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors'}
      >
        <h3 className={'dark:text-white text-neutral-950'}>Pricing Component</h3>
        <p className={'text-neutral-500 text-sm'}>Neo Brutalist style animated pricing component</p>
      </span>
    </div>
  )
  
  const Blog = () => (
    <>
      <div className={'p-4 border-b dark:border-neutral-800'}>
        <div className={'text-sm dark:text-neutral-500 text-neutral-400 px-3'}>info</div>
        <span
          className={
            'block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit'
          }
        >
          <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
            Workflow{' '}
            <svg
              viewBox="0 0 12 12"
              width="10px"
              xmlns="http://www.w3.org/2000/svg"
              className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
            >
              <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
            </svg>
          </h3>
          <p className={'text-neutral-500 text-sm'}>Check out how we deliver our products</p>
        </span>
      </div>
      <div className={'p-4'}>
        <div className={'text-sm dark:text-neutral-500 text-neutral-400 px-3 pt-0'}>tutorials</div>
        <div className={'flex'}>
          <span
            className={
              'hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors'
            }
          >
            <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
              Animations{' '}
              <svg
                viewBox="0 0 12 12"
                width="10px"
                xmlns="http://www.w3.org/2000/svg"
                className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
              >
                <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
              </svg>
            </h3>
            <p className={'text-neutral-500 text-sm'}>
              You will learn how to make fascinating animations
            </p>
          </span>
          <span
            className={
              'hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors'
            }
          >
            <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
              API{' '}
              <svg
                viewBox="0 0 12 12"
                width="10px"
                xmlns="http://www.w3.org/2000/svg"
                className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
              >
                <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
              </svg>
            </h3>
            <p className={'text-neutral-500 text-sm'}>
              Learn how to build fast and reliable APIs to deliver data
            </p>
          </span>
        </div>
      </div>
    </>
  )