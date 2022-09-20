import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import mplcursors
import pandas as pd
import seaborn as sns
from matplotlib.pyplot import figure

from .util.logger import logger


class Plotter:
    @staticmethod
    def set_grid(ax: plt.Axes):
        # Change major ticks to show every 1
        ax.xaxis.set_major_locator(ticker.MultipleLocator(1))
        ax.yaxis.set_major_locator(ticker.MultipleLocator(1))

        # Change minor ticks to show every 0.1 (1/10 = 0.1)
        ax.xaxis.set_minor_locator(ticker.AutoMinorLocator(10))
        ax.yaxis.set_minor_locator(ticker.AutoMinorLocator(10))

        # Turn grid on for both major and minor ticks and style minor slightly
        # differently.
        ax.grid(which="major", color="#CCCCCC", linestyle="--")
        ax.grid(which="minor", color="#CCCCCC", linestyle=":")

        return ax


class TargetPlotter(Plotter):
    def __init__(self) -> None:
        # set figure size
        sns.set(rc={"figure.figsize": (16, 9)})

        sns.set_style("darkgrid")

    def plot_targets(self, df: pd.DataFrame):

        if len(df) == 0:
            logger.info("no targets to plot")
            return

        logger.info(f"plotting {len(df)} target updates..")

        try:

            # TODO: maybe add time -> updates since {time}
            plt.title(f"Target updates (click on targets to view ICAO address)")

            # equal size grid lines
            plt.axis("equal")

            # draw the plot
            ax = sns.scatterplot(
                x="latitude", y="longitude", data=df, hue="icao_address"
            )

            # set the grid
            ax = self.set_grid(ax)

            # remove legend
            # because there are too much targets,
            # showing address on hover is better
            ax.get_legend().remove()

            # show target icao on hover
            def show_annotation(sel):
                sel.annotation.set_text(df["icao_address"][sel.target.index])

            cursor = mplcursors.cursor()
            cursor.connect("add", show_annotation)

            plt.show()

        except Exception as e:
            logger.error(f"error plotting targets: {e}")
