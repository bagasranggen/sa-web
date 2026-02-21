import React from 'react';

import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Picture, { BaseItemProps } from '@/components/common/Picture';

import LogoText from '@/assets/images/logo-sekar-text.png';

export type HeaderProps = {};

const Header = ({}: HeaderProps): React.ReactElement => {
    return (
        <nav className="nav">
            <Container className="flex items-center justify-between">
                <Button
                    as="anchor"
                    href="/">
                    <Picture
                        imageClassName="max-w-[18rem]"
                        items={[LogoText as BaseItemProps]}
                    />
                </Button>

                <div className="nav__links">
                    <Button
                        as="anchor"
                        className="nav__link"
                        href="/collection">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>
                </div>
            </Container>
        </nav>
    );
};

export default Header;
